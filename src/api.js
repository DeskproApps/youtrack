
import { get, put, del, getApiUrl, notEmpty } from './utils';

/**
 * Returns a promise which resolves with a list of issues
 *
 * @returns { Promise }
 */
export const fetchIssue = issue => get(`${getApiUrl()}/issue/${issue}`);


/**
 * Returns issues matching the given filter
 *
 * @param {String} filter
 * @returns { Promise }
 */
export const searchIssues = (filter) => {
  const encodedFilter = encodeURIComponent(filter);
  return get(`${getApiUrl()}/issue?filter=${encodedFilter}`).then(resp => resp.body.issue);
};

// /**
//  * Returns issues matching the given filter
//  *
//  * @param {String} filter
//  * @returns { Promise }
//  */
// export const searchIssues = (filter) => {
//   const encodedFilter = encodeURIComponent(filter);
//   return get(`${getApiUrl()}/issue?filter=${encodedFilter}`)
//     .then((resp) => {
//       return resp.body.issue.map((issue) => {
//         let description = '';
//         for (let i = 0; i < issue.field.length; i++) {
//           if (issue.field[i].name === 'description') {
//             description = issue.field[i].value;
//             if (description.length > 10) {
//               description = `${description.substr(0, 10)}...`;
//             }
//           }
//         }
//
//         return `${issue.id} - ${description}`;
//       });
//     });
// };

/**
 * Returns a promise which resolves with a list of issues
 *
 * @returns { Promise }
 */
export const fetchIssues = () => get(`${getApiUrl()}/issue`);

/**
 * Returns a promise which resolves with a list of projects
 *
 * @returns { Promise }
 */
export const fetchProjects = () => {
  return get(`${getApiUrl()}/project/all?verbose=false`);
};

/**
 * Returns a promise which resolves with a success or failure in creating a Youtrack issue
 *
 * @returns { Promise }
 */
export const createIssue = (data = {}) => {
  const { project = '', issueId = '', summary = '', desc = '' } = data;

  if (notEmpty(issueId)) {
    return fetchIssue(issueId);
  }

  return notEmpty(project) && notEmpty(summary) && notEmpty(desc) ?
    put(encodeURI(`${getApiUrl()}/issue?project=${project}&summary=${summary}&description=${desc}`), data) :
    Promise.reject(JSON.stringify({ message: 'Missing parameters: project, summary, desc' }));
};

/**
 * Returns a promise which resolves with a success or failure in deleting a Youtrack issue
 *
 * @returns { Promise }
 */
export const deleteIssue = (issue = '') => {
  return notEmpty(issue) ?
    del(`${getApiUrl()}/issue/${issue}`) :
    Promise.reject(JSON.stringify({ message: 'Missing parameter: issue' }));
};
