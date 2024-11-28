import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchSystemSummaryStart,
  fetchSystemSummarySuccess,
  fetchSystemSummaryFailure,
  fetchPassFailSummaryStart,
  fetchPassFailSummarySuccess,
  fetchPassFailSummaryFailure,
  fetchSixMonthActivityStart,
  fetchSixMonthActivitySuccess,
  fetchSixMonthActivityFailure,
} from '../redux/summarySlice';
import axiosInstance from '@/utility/axiosInstance';

// Worker sagas
function* fetchSystemSummarySaga() {
  try {
    const response = yield call(axiosInstance.get, 'admin/statistics');
    yield put(fetchSystemSummarySuccess(response.data));
  } catch (error) {
    yield put(fetchSystemSummaryFailure(error.message));
  }
}

function* fetchPassFailSummarySaga() {
  try {
    const response = yield call(fetchPassFailSummaryApi);
    yield put(fetchPassFailSummarySuccess(response.data));
  } catch (error) {
    yield put(fetchPassFailSummaryFailure(error.message));
  }
}

function* fetchSixMonthActivitySaga() {
  try {
    const response = yield call(fetchSixMonthActivityApi);
    yield put(fetchSixMonthActivitySuccess(response.data));
  } catch (error) {
    yield put(fetchSixMonthActivityFailure(error.message));
  }
}

// Watcher sagas
export default function* summarySaga() {
  yield takeLatest(fetchSystemSummaryStart.type, fetchSystemSummarySaga);
  yield takeLatest(fetchPassFailSummaryStart.type, fetchPassFailSummarySaga);
  yield takeLatest(fetchSixMonthActivityStart.type, fetchSixMonthActivitySaga);
}
