
import isUndefined from 'lodash/isUndefined';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import isBoolean from 'lodash/isBoolean';
import isNumber from 'lodash/isNumber';
import partial from "lodash/partial";

let restApi = null;
let authToken = null;
let authClient = null;
let domainUrl = null;
let storageClient = null;

const buildReqObj = obj => {
  return Object.assign({
    headers: {
      'X-Expect-Empty-Response': 'true',
      'Content-Type': 'application/json;charset=UTF-8',
      Accept: 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    credentials: 'include',
    cache: 'no-cache'
  }, obj);
};

const isDefined = val => !isUndefined(val);

const exists = val => !isUndefined(val) && !isEmpty(val);

const getProp = (object = {}, path = '', defaultValue = null) => get(object, path, defaultValue);

const notEmpty = val => {
    const castValue = isNumber(val) ? Number(val) : isBoolean(val) ? Boolean(val) : void 0;
    return isDefined(castValue) ? castValue ? castValue : false : !isEmpty(val);
};

const fetchAccessToken = () => {
  const query = {
    'access_type' : 'offline'
  };
  return authClient.access('youtrack', { query }).then(resp => {
    return tryAndSetAuthToken(resp) ? Promise.resolve(resp) : Promise.reject(resp);
  });
};

const refreshAccessToken = () => {
  const query = {
    'refresh_token' : 'user_settings'
  };
  return authClient.refreshAccess('youtrack', { query }).then(resp => {
    return tryAndSetAuthToken(resp) ? Promise.resolve(resp) : Promise.reject(resp);
  });
};

const fetchProxyOrRetry = (reqURL, reqData) => restApi.fetchProxy(reqURL, buildReqObj(reqData)).catch(err => {
    if (getProp(err, 'errorData.statusCode', null) === 401 || getProp(err, 'message', null) === 'MISSING TOKEN') {
      return refreshAccessToken()
        .then(storeAccessToken)
        .then(() => restApi.fetchProxy(reqURL, buildReqObj(reqData)))
        ;
    }
    return Promise.reject(err);
  })
;

const storeAccessToken = resp => storageClient.setAppStorage('user_settings', { ...resp });

const tryAndSetAuthToken = obj => {
  if (obj && obj.access_token) {
    authToken = obj.access_token;
    return true;
  }
  return false;
};

const setStorageClient = obj => {
  storageClient = obj;
};

module.exports = {

  isDefined,

  exists,

  getProp,

  notEmpty,

  fetchAccessToken,

  refreshAccessToken,

  tryAndSetAuthToken,

  setStorageClient,

  storeAccessToken,

  getApiUrl: () => `${domainUrl}/youtrack/rest`,

  setDomainUrl: url => domainUrl = url,

  getDomainUrl: () => domainUrl,

  setRestApi: obj => { restApi = obj; },

  setAuthClient: obj => { authClient = obj; },

  put: (reqURL = '', data = {}, headers = {}) => {
    return isDefined(restApi) ?
      fetchProxyOrRetry(reqURL, { method: 'PUT', body: JSON.stringify(data) }) :
      Promise.reject({ message: 'DPAPP Rest API has not been set. Please use setRestApi to refer to it.' });
  },

  get: (reqURL = '', headers = {}) => {
    return isDefined(restApi)
      ? fetchProxyOrRetry(reqURL, { method: 'GET' })
      : Promise.reject({ message: 'DPAPP Rest API has not been set. Please use setRestApi to refer to it.' });
  },

  del: (reqURL = '', data = {}, headers = {}) => {
    return isDefined(restApi) ?
      fetchProxyOrRetry(reqURL, { method: 'DELETE', body: JSON.stringify(data) }) :
      Promise.reject({ message: 'DPAPP Rest API has not been set. Please use setRestApi to refer to it.' });
  }
};
