import { call, put, takeLatest } from 'redux-saga/effects';
import {
  planTrainingStart,
  planTrainingSuccess,
  planTrainingFailure,
  fetchplannedTrainingsStart,
  fetchplannedTrainingsSuccess,
  fetchplannedTrainingsFailure,
} from '../redux/planSlice';
import axiosInstance from '@/utility/axiosInstance';

// Worker Saga
function* planTrainingSaga(action) {
  try {
    const { id, plannedDate } = action.payload;
    console.log(id)
    console.log(plannedDate)
    const url = `/trainee/plan/${id}`
    const response = yield call(axiosInstance.post,url,{plannedDate});
    yield put(planTrainingSuccess(response.data.message));
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || 'Something went wrong. Please try again.';
    yield put(planTrainingFailure(errorMessage));
  }
}

function* fetchPlannedTrainingsSaga() {
  try {
    const response = yield call(axiosInstance.get, '/admin/getPlannedTraining'); // Adjust API endpoint as needed
    yield put(fetchplannedTrainingsSuccess(response.data.plannedTrainings));
    console.log(response.data.plannedTrainings)
  } catch (error) {
    yield put(fetchplannedTrainingsFailure(error.message || 'Failed to fetch planned trainings.'));
  }
}

// Watcher Saga
export default function* planSaga() {
  yield takeLatest(planTrainingStart.type, planTrainingSaga);
  yield takeLatest(fetchplannedTrainingsStart.type, fetchPlannedTrainingsSaga);
}

