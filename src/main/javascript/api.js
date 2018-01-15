
import { API_URL } from './constants'
import { get } from './utils';

/**
 * Returns a promise which resolves with a list of issues
 *
 * @returns { Promise }
 */
export const youtrackFetchIssues = () => get(`${API_URL}/issue`);
