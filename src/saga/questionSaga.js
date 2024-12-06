// src/sagas/questionSaga.js
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  createQuestionStart,
  createQuestionSuccess,
  createQuestionFailure,
  updateQuestionStart,
  updateQuestionSuccess,
  updateQuestionFailure,
  deleteQuestionStart,
  deleteQuestionSuccess,
  deleteQuestionFailure
} from '../redux/questionSlice';
import axiosInstance from '@/utility/axiosInstance';

function* createQuestionSaga(action) {
  try {
    const { chapterId,questions,trainingId } = action.payload;
    console.log(questions)
    console.log(chapterId)
    const url = `/admin/createQuestions/${chapterId}/${trainingId}`;
    const response = yield call(axiosInstance.post, url, questions, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    yield put(createQuestionSuccess(response.data));
  } catch (error) {
    if (error.response) {
      // The request was made, but the server responded with a status code outside the 2xx range
      console.error("Server error:", error.response.data);
      yield put(createQuestionFailure(error.response.data.details || error.response.data.message));
    } else if (error.request) {
      // The request was made, but no response was received (network error)
      console.error("Network error:", error.request);
      yield put(createQuestionFailure("Network error: Unable to reach the server."));
    } else {
      // Something happened in setting up the request that triggered an error
      console.error("Error in setting up request:", error.message);
      yield put(createQuestionFailure("An unexpected error occurred."));
    }
  }
}

function* updateQuestionSaga(action) {
  try {
    const { id, data } = action.payload;
    const response = yield call(axiosInstance.put, `/api/questions/${id}`, data);
    yield put(updateQuestionSuccess(response.data));
  } catch (error) {
    yield put(updateQuestionFailure(error.message));
  }
}

function* deleteQuestionSaga(action) {
  try {
    const { id } = action.payload;
    yield call(axiosInstance.delete, `/api/questions/${id}`);
    yield put(deleteQuestionSuccess(id));
  } catch (error) {
    yield put(deleteQuestionFailure(error.message));
  }
}

export default function* questionSaga() {
  yield takeLatest('questions/createQuestionStart', createQuestionSaga);
  yield takeLatest('questions/updateQuestionStart', updateQuestionSaga);
  yield takeLatest('questions/deleteQuestionStart', deleteQuestionSaga);
}
