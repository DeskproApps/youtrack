
import isUndefined from 'lodash/isUndefined';
import isEmpty from 'lodash/isEmpty';
import lodashGet from 'lodash/get';
import isBoolean from 'lodash/isBoolean';
import isNumber from 'lodash/isNumber';

let restApi = null;
let authToken = null;
let authClient = null;
let youtrackSettings = {
  youtrackServiceId:  null,
  youtrackHostUrl:    null,
  youtrackHubUrl:     null
};
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

const getProp = (object = {}, path = '', defaultValue = null) => lodashGet(object, path, defaultValue);

const notEmpty = val => {
    const castValue = isNumber(val) ? Number(val) : isBoolean(val) ? Boolean(val) : void 0;
    return isDefined(castValue) ? castValue ? castValue : false : !isEmpty(val);
};

const fetchAccessToken = () => authClient.requestAccess('youtrack', {
    grant:        "implicit",
    authorizeUri: `${youtrackSettings.youtrackHubUrl}/api/rest/oauth2/auth`,
    clientId:     `${youtrackSettings.youtrackServiceId}`,
    query: {
      request_credentials:  "default",
      scope:                youtrackSettings.youtrackServiceId,
    }
  })
  .then(response => {
    if (tryAndSetAuthToken(response)) {
      const { access_token, expires_in, scope, token_type } = response;
      return  Promise.resolve({ access_token, expires_in, scope, token_type })
    }
    return Promise.reject(response);
  })
;

const refreshAccessToken = () => {
  return fetchAccessToken().then(resp => {
    return tryAndSetAuthToken(resp) ? storeAccessToken(resp) :  Promise.reject(resp);
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


function getApiUrl()
{
  return `${youtrackSettings.youtrackHostUrl}/youtrack/rest`;
}

/**
 * @param {String} youtrackServiceId
 * @param {String} youtrackHostUrl
 * @param {String} youtrackHubUrl
 */
function setYoutrackSettings({ youtrackServiceId, youtrackHostUrl, youtrackHubUrl  }) {
  youtrackSettings = { youtrackServiceId, youtrackHostUrl, youtrackHubUrl  }
}

function getDomainUrl(url) {
  return youtrackSettings.youtrackHostUrl;
}

function setRestApi(obj) {
  restApi = obj;
}

function setAuthClient(obj) {
  authClient = obj;
}

function put(reqURL = '', data = {}, headers = {}) {
  return isDefined(restApi) ?
    fetchProxyOrRetry(reqURL, { method: 'PUT', body: JSON.stringify(data) }) :
    Promise.reject({ message: 'DPAPP Rest API has not been set. Please use setRestApi to refer to it.' });
}

function get(reqURL = '', headers = {}) {
  return isDefined(restApi)
    ? fetchProxyOrRetry(reqURL, { method: 'GET' })
    : Promise.reject({ message: 'DPAPP Rest API has not been set. Please use setRestApi to refer to it.' });
}

function del(reqURL = '', data = {}, headers = {}) {
  return isDefined(restApi) ?
    fetchProxyOrRetry(reqURL, { method: 'DELETE', body: JSON.stringify(data) }) :
    Promise.reject({ message: 'DPAPP Rest API has not been set. Please use setRestApi to refer to it.' });
}


export {

  isDefined,

  exists,

  getProp,

  notEmpty,

  fetchAccessToken,

  refreshAccessToken,

  tryAndSetAuthToken,

  setStorageClient,

  storeAccessToken,

  getApiUrl,

  setYoutrackSettings,

  getDomainUrl,

  setRestApi,

  setAuthClient,

  put,

  get,

  del
};
