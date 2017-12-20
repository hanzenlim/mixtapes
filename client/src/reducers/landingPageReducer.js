import { LANDING_PAGE_COUNTER } from '../actions/types';

const getInitialState = {
  counter: 0
};

export default function(state = getInitialState, action) {
  // console.log(action);
  debugger;
  switch (action.type) {
    case LANDING_PAGE_COUNTER:
      return {
        ... state,
        counter: ++state.counter
      };
    default:
      return state;
  }
}
