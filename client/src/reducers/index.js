import { combineReducers } from 'redux';
import authReducer from './authReducer';
import termReducer from './termReducer';

// Whatever keys we provide to this object - represents the keys inside our state
export default combineReducers({
  auth: authReducer,
  term: termReducer
});
