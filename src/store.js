import { reducer as reduxFormReducer } from 'redux-form'
import { createStore, combineReducers } from 'redux';
import appReducers from './redux/reducers';

const reducer = combineReducers({
  form: reduxFormReducer, // mounted under "form"
  app: appReducers,
});
const store = createStore(reducer);

export default store;
