import { SET_TIMEZONE, GET_TIME } from "./../constants/action-types";

const initialState = [
  { date: 0, timezone: 7 },
  { date: 0, timezone: 3 },
];

function GetBackFixedTime(gmt) {
  let setdate = new Date();
  let sethours = setdate.setHours(
    setdate.getHours() + setdate.getTimezoneOffset() / 60 + gmt
  );

  return new Date(sethours);
}

function rootReducer(state = initialState, action) {
  if (action.type === SET_TIMEZONE) {
    state[0].timezone = action.fixgmt.timezonefirst;
    state[1].timezone = action.fixgmt.timezonesecond;
  } else if ((action.type = GET_TIME)) {
    state[0].date = GetBackFixedTime(state[0].timezone);
    state[1].date = GetBackFixedTime(state[1].timezone);
  }
  return state;
}

export default rootReducer;
