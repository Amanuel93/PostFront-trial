import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { startTrainingStart, startTrainingSuccess, startTrainingFailure } from '../redux/startTraining';
import axiosInstance from '@/utility/axiosInstance'; 

// Worker Saga
function* startSaga(action) {
  try {
    const { trainingId, passcode} = action.payload;
    const response = yield call(axiosInstance.post, `/trainee/start-training/${trainingId}`, { passcode });
    yield put(startTrainingSuccess(response.data.progress));
  } catch (error) {
    yield put(startTrainingFailure(error.response?.data?.message || 'Failed to start training'));
  }
}

// Watcher Saga
export default function* startTrainingSaga() {
  yield takeLatest('startTraining/startTrainingStart', startSaga);
}
