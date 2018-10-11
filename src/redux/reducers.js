import * as action_types from './action_types';
import { getDpApp } from '@deskpro/apps-sdk';

const initialState = {
  projects: [],
  issues: [],
  dpapp: null,
  errorHandler() {},
};

const customFieldID = 'youtrackCards';

function youtrackApp(state = initialState, action) {
  const dpapp = getDpApp();
  switch (action.type) {
    case action_types.SET_PROJECTS:
      return {
        ...state,
        projects: action.payload
      };
    case action_types.SET_ISSUES:
      dpapp.ui.badgeCount = action.payload.length;
      return {
        ...state,
        issues: action.payload
      };
    case action_types.ADD_ISSUE:
      const issues = [...state.issues, action.payload];
      dpapp.ui.badgeCount = issues.length;
      return {
        ...state,
        issues
      };
    case action_types.LINK_ISSUE: {
      const issue = action.payload;
      const { customFields } = dpapp.context.get('ticket');

      customFields.getAppField(customFieldID, [])
        .then((issues) => {
          return customFields.setAppField(customFieldID, [...issues, issue.id])
            .catch(console.log);
        });
      const issues = [...state.issues, issue];
      dpapp.ui.badgeCount = issues.length;
      return {
        ...state,
        issues
      };
    }
    case action_types.UNLINK_ISSUE: {
      const issue = action.payload;
      const { customFields } = dpapp.context.get('ticket');

      customFields.getAppField(customFieldID, [])
        .then(resp => {
          return customFields.setAppField(customFieldID, resp.filter(i => i.toLowerCase() !== issue.id.toLowerCase()))
        })
        .catch(state.errorHandler);
      const issues = state.issues.filter(i => i.id !== issue.id);
      dpapp.ui.badgeCount = issues.length;
      return {
        ...state,
        issues
      };
    }
    case action_types.SET_ERROR_HANDLER:
      return {
        ...state,
        errorHandler: action.payload
      };
    default:
      return state
  }
}

export default youtrackApp
