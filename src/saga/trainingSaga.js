// src/store/trainingSaga.js
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchTrainingsStart,
  fetchTrainingsSuccess,
  fetchTrainingsFailure,
  fetchTrainingByIdStart,
  fetchTrainingByIdSuccess,
  fetchTrainingByIdFailure,
  createTrainingStart,
  createTrainingSuccess,
  createTrainingFailure,
  updateTrainingStart,
  updateTrainingSuccess,
  updateTrainingFailure,
  deleteTrainingStart,
  deleteTrainingSuccess,
  deleteTrainingFailure,
  saveTrainingAnswersStart,
  saveTrainingAnswersSuccess,
  saveTrainingAnswersFailure,
} from '../redux/trainingSlice';
import axiosInstance from '@/utility/axiosInstance';

// Sagas
function* fetchTrainingsSaga() {
  try {
    const response = yield call(axiosInstance.get,'admin/getAllTraining');
    yield put(fetchTrainingsSuccess(response.data));
    console.log('Data fetched:', response.data)
  } catch (error) {
    if (error.response) {
      // The request was made, but the server responded with a status code outside the 2xx range
      console.error("Server error:", error.response.data);
      yield put(fetchTrainingsFailure(error.response.data.details || error.response.data.message));
    } else if (error.request) {
      // The request was made, but no response was received (network error)
      console.error("Network error:", error.request);
      yield put(fetchTrainingsFailure("Network error: Unable to reach the server."));
    } else {
      // Something happened in setting up the request that triggered an error
      console.error("Error in setting up request:", error.message);
      yield put(fetchTrainingsFailure("An unexpected error occurred."));
    }
  }
}


function* fetchTrainingByIdSaga(action) {
  try {
    const { id } = action.payload;
    const url = `admin/getTraining/${id}`;
    // console.log(id)
    // Correcting the axiosInstance.get call by passing url in parentheses
    const response = yield call(axiosInstance.get, url);
    yield put(fetchTrainingByIdSuccess(response.data));
    console.log(response.data.Chapters)
  } catch (error) {
    yield put(fetchTrainingByIdFailure(error.message));
  }
}


function* createTrainingSaga(action) {
  try {
    const response = yield call(axiosInstance.post,'admin/create', action.payload);
    const { id, ...trainingData } = response.data; // Extract the id from response
    yield put(createTrainingSuccess({ id, ...trainingData }));
    console.log(id)
    console.log(response.data.id)
  } catch (error) {
    yield put(createTrainingFailure(error.message));
  }
}

function* updateTrainingSaga(action) {
  try {
    const id = action.payload.id;
    const url = `admin/update/${id}`;
    const response = yield call(axiosInstance.put, url, action.payload.data);
    yield put(updateTrainingSuccess(response.data));
  } catch (error) {
    yield put(updateTrainingFailure(error.message));
  }
}

function* deleteTrainingSaga(action) {
  try {
    const {id} = action.payload;
    const url = `admin/delete/${id}`;
    yield call(axiosInstance.delete,url);
    yield put(deleteTrainingSuccess(action.payload));
  } catch (error) {
    yield put(deleteTrainingFailure(error.message));
  }
}

function* saveTrainingAnswersSaga(action) {
  try {
    const {trainingId,answers} = action.payload;
    console.log(answers)
    const url = `trainee/submit/${trainingId}`
    const response = yield call(axiosInstance.post, url, answers);
    yield put(saveTrainingAnswersSuccess(response.data));
  } catch (error) {
    // yield put(saveTrainingAnswersFailure(error.message));
    const errorMessage = error.response?.data?.message || error.message;
      if (error.response) {
        // The request was made, but the server responded with a status code outside the 2xx range
        console.error("Server error:", error.response.data);
        yield put(saveTrainingAnswersFailure(error.response.data.message));
      } else if (error.request) {
        // The request was made, but no response was received (network error)
        console.error("Network error:", error.request);
        yield put(saveTrainingAnswersFailure("Network error: Unable to reach the server."));
      } else {
        // Something happened in setting up the request that triggered an error
        console.error("Error in setting up request:", error.message);
        yield put(saveTrainingAnswersFailure("An unexpected error occurred."));
      }
  }
}

export default function* trainingSaga() {
  yield takeLatest('training/fetchTrainingsStart', fetchTrainingsSaga);
  yield takeLatest('training/fetchTrainingByIdStart', fetchTrainingByIdSaga);
  yield takeLatest('training/createTrainingStart', createTrainingSaga);
  yield takeLatest('training/updateTrainingStart', updateTrainingSaga);
  yield takeLatest('training/deleteTrainingStart', deleteTrainingSaga);
  yield takeLatest('training/saveTrainingAnswersStart', saveTrainingAnswersSaga);
}
