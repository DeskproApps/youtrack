
import { API_URL } from './constants';
import { get, put, del, notEmpty } from './utils';

/**
 * Returns a promise which resolves with a list of issues
 *
 * @returns { Promise }
 */
export const fetchIssue = issue => get(`${API_URL}/issue/${issue}`);

/**
 * Returns a promise which resolves with a list of issues
 *
 * @returns { Promise }
 */
export const fetchIssues = () => get(`${API_URL}/issue`);

/**
 * Returns a promise which resolves with a list of projects
 *
 * @returns { Promise }
 */
export const fetchProjects = () => get(`${API_URL}/project/all?verbose=false`);

/**
 * Returns a promise which resolves with a success or failure in creating a Youtrack issue
 *
 * @returns { Promise }
 */
export const createIssue = (data = {}) => {
  const { project = '', summary = '', desc = '' } = data;
  return notEmpty(project) && notEmpty(summary) && notEmpty(desc) ?
    put(encodeURI(`${API_URL}/issue?project=${project}&summary=${summary}&description=${desc}`)) :
    Promise.reject(JSON.stringify({ message: 'Missing parameters: project, summary, desc' }));
};

/**
 * Returns a promise which resolves with a success or failure in deleting a Youtrack issue
 *
 * @returns { Promise }
 */
export const deleteIssue = (issue = '') => {
  return notEmpty(issue) ?
    del(`${API_URL}/issue/${issue}`) :
    Promise.reject(JSON.stringify({ message: 'Missing parameter: issue' }));
};
