import * as action_types from './action_types';

const initialState = {
  projects: [],
  issues: [],
};

function youtrackApp(state = initialState, action) {
  switch (action.type) {
    case action_types.SET_PROJECTS:
      return Object.assign({}, state, {
        projects: action.payload
      });
    case action_types.SET_ISSUES:
      return Object.assign({}, state, {
        issues: action.payload
      });
    default:
      return state
  }
}

export default youtrackApp
