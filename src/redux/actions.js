import * as action_types from './action_types';

export const setProjects = content => ({
  type: action_types.SET_PROJECTS,
  payload: content
});

export const setIssues = content => ({
  type: action_types.SET_ISSUES,
  payload: content
});

export const addIssue = content => ({
  type: action_types.ADD_ISSUE,
  payload: content
});

export const linkIssue = content => ({
  type: action_types.LINK_ISSUE,
  payload: content
});

export const unlinkIssue = content => ({
  type: action_types.UNLINK_ISSUE,
  payload: content
});

export const setErrorHandler = content => ({
  type: action_types.SET_ERROR_HANDLER,
  payload: content
});
