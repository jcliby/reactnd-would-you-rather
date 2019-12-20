import { SET_AUTHED_USER, LOG_OUT } from '../utils/constants';

export function setAuthedUser(id) {
  return {
    type: SET_AUTHED_USER,
    id
  };
}

export function logOut() {
  return {
    type: LOG_OUT
  };
}
