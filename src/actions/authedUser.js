import { SET_AUTHED_USER } from '../utils/constants';

export function setAuthedUser(id) {
  return {
    type: SET_AUTHED_USER,
    id
  };
}
