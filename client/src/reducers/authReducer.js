import { FETCH_USER } from '../actions/types';

export default function(state = null, action) {
  // console.log(action);
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false; // Return null, false or User Model

    default:
      return state;
  }
}
