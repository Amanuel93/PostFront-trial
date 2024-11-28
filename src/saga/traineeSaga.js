// features/trainees/traineeSaga.js
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchAllTraineesStart,
  fetchAllTraineesSuccess,
  fetchAllTraineesFailure,
  fetchTraineeInfoStart,
  fetchTraineeInfoSuccess,
  fetchTraineeInfoFailure,
  fetchTraineeStart,
  fetchTraineeSuccess,
  fetchTraineeFailure,
  fetchTraineesTrainingStart,
  fetchTraineesTrainingSuccess,
  fetchTraineesTrainingFailure,
} from '../redux/traineeSice';
import axiosInstance from '@/utility/axiosInstance';

// Fetch all trainees
function* fetchSingleTraineeSaga(action) {
    try {
      const { id } = action.payload;
      console.log(id);
      const response = yield call(axiosInstance.get, `admin/getTrainee/${id}`); // Adjust API endpoint as needed
      yield put(fetchTraineeSuccess(response.data));
      console.log(response.data);
    } catch (error) {
      yield put(fetchTraineeFailure(error.response?.data?.message || 'Failed to fetch trainees'));
    }
  }

// Fetch all trainees
function* fetchAllTraineesSaga() {
  try {
    const response = yield call(axiosInstance.get, 'admin/getAll-trainee'); // Adjust API endpoint as needed
    yield put(fetchAllTraineesSuccess(response.data.trainees));
  } catch (error) {
    yield put(fetchAllTraineesFailure(error.response?.data?.message || 'Failed to fetch trainees'));
  }
}

// Fetch trainee info
function* fetchTraineeInfoSaga(action) {
  try {
    const { id } = action.payload;
    const response = yield call(axiosInstance.get, `admin/getTraineeInfo/${id}`); // Adjust API endpoint as needed
    yield put(fetchTraineeInfoSuccess(response.data.progress));
    console.log(response.data.progress);
  } catch (error) {
    yield put(fetchTraineeInfoFailure(error.response?.data?.message || 'Failed to fetch trainee info'));
  }
}

// Fetch trainee info
function* fetchTraineesTrainingSaga(action) {
  try {
    const response = yield call(axiosInstance.get, `trainee/getTrainings`); // Adjust API endpoint as needed
    yield put(fetchTraineesTrainingSuccess(response.data.data));
    console.log(response.data)
  } catch (error) {
    yield put( fetchTraineesTrainingFailure(error.response?.data?.message || 'Failed to fetch trainee info'));
  }
}

// Watcher Sagas
export default function* traineeSaga() {
  yield takeLatest(fetchTraineeStart.type, fetchSingleTraineeSaga); 
  yield takeLatest(fetchAllTraineesStart.type, fetchAllTraineesSaga);
  yield takeLatest(fetchTraineeInfoStart.type, fetchTraineeInfoSaga);
  yield takeLatest(fetchTraineesTrainingStart.type, fetchTraineesTrainingSaga);
}
