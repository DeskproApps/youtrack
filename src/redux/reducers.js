import * as action_types from './action_types';

const initialState = {
  projects: [],
  issues: [],
  dpapp: null,
  errorHandler() {},
};

const customFieldID = 'youtrackCards';

function youtrackApp(state = initialState, action) {
  switch (action.type) {
    case action_types.SET_PROJECTS:
      return {
        ...state,
        projects: action.payload
      };
    case action_types.SET_ISSUES:
      return {
        ...state,
        issues: action.payload
      };
    case action_types.ADD_ISSUE:
      return {
        ...state,
        issues: [...state.issues, action.payload]
      };
    case action_types.LINK_ISSUE: {
      const issue = action.payload;
      const { customFields } = state.dpapp.context.get('ticket');

      customFields.getAppField(customFieldID, [])
        .then((issues) => {
          return customFields.setAppField(customFieldID, [...issues, issue.id])
            .catch(console.log);
        });
      return {
        ...state,
        issues: [...state.issues, issue]
      };
    }
    case action_types.UNLINK_ISSUE: {
      const issue = action.payload;
      const { customFields } = state.dpapp.context.get('ticket');

      customFields.getAppField(customFieldID, [])
        .then(resp => {
          return customFields.setAppField(customFieldID, resp.filter(i => i.toLowerCase() !== issue.id.toLowerCase()))
        })
        .catch(state.errorHandler);
      return {
        ...state,
        issues: state.issues.filter(i => i.id !== issue.id)
      };
    }
    case action_types.SET_DPAPP:
      return {
        ...state,
        dpapp: action.payload
      };
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
