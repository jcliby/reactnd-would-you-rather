import { saveQuestionAnswer, saveQuestion } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading';
import {
  RECEIVE_QUESTIONS,
  ADD_ANSWER,
  ADD_QUESTION
} from '../utils/constants';

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
