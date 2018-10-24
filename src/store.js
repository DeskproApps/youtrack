import { reducer as reduxFormReducer } from 'redux-form'
import { createStore, combineReducers } from 'redux';
import appReducers from './redux/reducers';

export default function createAppStore() {

  const reducer = combineReducers({
    form: reduxFormReducer, // mounted under "form"
    app: appReducers,
  });

  return createStore(reducer);
}



