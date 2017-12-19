import axios from 'axios';
import { FETCH_USER } from './types';
import { FETCH_TERM } from './types';
import { FETCH_VIDEO } from './types';

export const fetchUser = () => {
  // WITHOUT REDUX-THUNK
  // Get request that returns current user | Communicates with auth reducer whether user is logged in or not
  // const request = axios.get('/api/current_user');
  //
  // return {
  //   type: FETCH_USER,
  //   payload: request
  // }

  // WITH REDUX-THUNK - Inspects values of the action creator
  // If it sees we return a function instead of a normal action.
  // redux-thunk will automatically call this function and pass in that dispatch function as an argument
  // We want to dispatch an action until this API request has been completed
  return async dispatch => {
    const res = await axios.get('./api/current_user');

    dispatch({ type: FETCH_USER, payload: res.data });
  };
};

// export const fetchVideo = () => {
//   reutnr async dispatch => {
//     const res = await axios.get('./api/videos')
//   }
// }
