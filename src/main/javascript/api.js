
import { API_URL } from './constants'
import { get, put, notEmpty } from './utils';

/**
 * Returns a promise which resolves with a list of issues
 *
 * @returns { Promise }
 */
export const youtrackFetchIssues = () => get(`${API_URL}/issue`);

/**
 * Returns a promise which resolves with a success or failure in creating a Youtrack issue
 *
 * @returns { Promise }
 */
export const youtrackCreateIssue = (data = {}) => {
  const { project = '', summary = '', desc = '' } = data;
  return notEmpty(project) && notEmpty(summary) && notEmpty(desc) ?
    put(`${API_URL}/issue?project=${project}&summary=${summary}&description=${desc}`) :
    Promise.reject(JSON.stringify({ message: 'Missing or misspelt parameters: project, summary, desc' }));
}
