import { combineReducers } from 'redux';
import authReducer from './authReducer';

// Whatever keys we provide to this object - represents the keys inside our state
export default combineReducers({
  auth: authReducer
});
