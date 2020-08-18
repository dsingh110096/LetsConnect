import { SET_ALERT, REMOVE_ALERT } from '../actions/types.js';

const initialState = [];

export default function (state = initialState, action) {
  //Destructing type and payload from action
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      return [payload];
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
}
