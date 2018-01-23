
import isUndefined from 'lodash/isUndefined';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import isBoolean from 'lodash/isBoolean';
import isNumber from 'lodash/isNumber';

let restApi = null;
let authToken = null;
let authClient = null;
let domainUrl = null;

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
  return authClient.access('youtrack').then(resp => {
    if (resp && resp.access_token) {
      setAuthToken(resp.access_token);
      return Promise.resolve(resp);
    }
  });
};


const storeAccessToken = (store, resp) => store.setAppStorage('user_settings', {access_token: resp.access_token});

const setAuthToken = obj => { authToken = obj; }

module.exports = {

  isDefined,

  exists,

  getProp,

  notEmpty,

  fetchAccessToken,

  setAuthToken,

  storeAccessToken,

  getApiUrl: () => `${domainUrl}/youtrack/rest`,

  setDomainUrl: url => domainUrl = url,

  getDomainUrl: () => domainUrl,

  setRestApi: obj => { restApi = obj; },

  setAuthClient: obj => { authClient = obj; },

  put: (reqURL = '', data = {}, headers = {}) => {
    return isDefined(restApi) ?
      restApi.fetchCORS(reqURL, buildReqObj({ method: 'PUT', body: JSON.stringify(data) })) :
      Promise.reject({ message: 'DPAPP Rest API has not been set. Please use setRestApi to refer to it.' });
  },

  get: (reqURL = '', headers = {}) => {
    return isDefined(restApi)
      ? restApi.fetchCORS(reqURL, buildReqObj({ method: 'GET' }))
      : Promise.reject({ message: 'DPAPP Rest API has not been set. Please use setRestApi to refer to it.' });
  },

  del: (reqURL = '', data = {}, headers = {}) => {
    return isDefined(restApi) ?
      restApi.fetchCORS(reqURL, buildReqObj({ method: 'DELETE', body: JSON.stringify(data) })) :
      Promise.reject({ message: 'DPAPP Rest API has not been set. Please use setRestApi to refer to it.' });
  }
}
