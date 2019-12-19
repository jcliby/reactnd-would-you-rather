import { saveQuestionAnswer, saveQuestion } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_ANSWER = 'ADD_ANSWER';
export const ADD_QUESTION = 'ADD_QUESTION';

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  };
}

function addAnswer({ authedUser, qid, answer }) {
  return {
    type: ADD_ANSWER,
    qid,
    authedUser,
    answer
  };
}

export function handleAddAnswer(info) {
  return dispatch => {
    dispatch(showLoading());
    dispatch(addAnswer(info));
    return saveQuestionAnswer(info).then(() => dispatch(hideLoading()));
  };
}

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question
  };
}

export function handleAddQuestion({
  optionOneText,
  optionTwoText,
  authedUser
}) {
  return dispatch => {
    dispatch(showLoading());
    return saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser
    })
      .then(question => dispatch(addQuestion(question)))
      .then(() => dispatch(hideLoading()));
  };
}
