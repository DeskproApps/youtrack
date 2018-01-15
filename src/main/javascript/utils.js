
import isUndefined from 'lodash/isUndefined'
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import isBoolean from 'lodash/isBoolean';
import isNumber from 'lodash/isNumber';

const status = resp => resp.status >= 200 && resp.status < 300 ? Promise.resolve(resp) : Promise.reject(resp)

const json = resp => resp.json();

const buildReqObj = obj => {
    return Object.assign({
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Accept': 'application/json',
            'Authorization': 'Bearer perm:Y2hyb2Rlcg==.VGVzdCBBUEk=.cW7kbMQ42bGqhwRtfNpI2cFDjAiswg'
        },
        credentials: 'include',
        cache: 'no-cache'
    }, obj);
};

module.exports = {

  isDefined: val => !isUndefined(val),

  exists: val => !isUndefined(val) && !isEmpty(val),

  getProp: (object = {}, path = '', defaultValue = null) => get(object, path, defaultValue),

  notEmpty: val => {
      const castValue = isNumber(val) ? Number(val) : isBoolean(val) ? Boolean(val) : void 0;
      return isDefined(castValue) ? castValue ? castValue : false : !isEmpty(val);
  },

  post: (reqURL = '', data = {}, headers = {}) => {
    return new Promise ((resolve, reject) => {
      fetch(reqURL, buildReqObj({ method: 'POST', body: JSON.stringify(data), headers }))
        .then(status)
          .then(json)
            .then(resolve)
            .catch(reject);
    });
  },

  get: (reqURL = '', headers = {}) => {
    return new Promise ((resolve, reject) => {
      fetch(reqURL, buildReqObj({ method: 'GET', headers }))
        .then(status)
          .then(json)
            .then(resolve)
            .catch(reject);
    });
  }
}
