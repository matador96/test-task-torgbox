import { SET_TIMEZONE } from "../constants/action-types";
import { GET_TIME } from "../constants/action-types";

export function setTimezone(payload) {
  return { type: SET_TIMEZONE, payload };
}
export function getTime(payload) {
  return { type: GET_TIME, payload };
}
