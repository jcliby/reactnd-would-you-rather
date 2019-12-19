import { RECEIVE_USERS, ADD_ANSWER, ADD_QUESTION } from '../utils/constants';

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users
  };
}

export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question
  };
}

export function addAnswer({ authedUser, qid, answer }) {
  return {
    type: ADD_ANSWER,
    qid,
    authedUser,
    answer
  };
}
