import * as action_types from './action_types';

export const setProjects = content => ({
    type: action_types.SET_PROJECTS,
    payload: content
});

export const setIssues = content => ({
    type: action_types.SET_ISSUES,
    payload: content
});
