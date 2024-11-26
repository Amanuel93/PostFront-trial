import { call, put, takeLatest } from 'redux-saga/effects';
import {
  createAdminStart,
  createAdminSuccess,
  createAdminFailure,
  deleteAdminStart,
  deleteAdminSuccess,
  deleteAdminFailure,
  getAdminsStart,
  getAdminsSuccess,
  getAdminsFailure,
} from '../redux/createAdminSlice';
import axiosInstance from '@/utility/axiosInstance';

// Worker Saga: Create Admin
function* createAdminSaga(action) {
  try {
    const response = yield call(axiosInstance.post, `admin/create-admin`, action.payload);
    yield put(createAdminSuccess(response.data));
    console.log(response.data)
  } catch (error) {
    yield put(createAdminFailure(error.response?.data?.error || 'Error creating admin.'));
  }
}

// Worker Saga: Delete Admin
function* deleteAdminSaga(action) {
  try {
    const {id} = action.payload;
    const url = `/admin/delete-admin/${id}`;
    const response = yield call(axiosInstance.delete, url);
    yield put(deleteAdminSuccess({ message: response.data.message, id: action.payload }));
  } catch (error) {
    yield put(deleteAdminFailure(error.response?.data?.error || 'Error deleting admin.'));
  }
}

// Worker Saga: Get Admins
function* getAdminsSaga() {
  try {
    const response = yield call(axiosInstance.get, 'admin/getAll-admins');
    yield put(getAdminsSuccess(response.data.admins));
  } catch (error) {
    yield put(getAdminsFailure(error.response?.data?.error || 'Error fetching admins.'));
  }
}

// Watcher Saga
export default function* adminSaga() {
  yield takeLatest(createAdminStart.type, createAdminSaga);
  yield takeLatest(deleteAdminStart.type, deleteAdminSaga);
  yield takeLatest(getAdminsStart.type, getAdminsSaga);
}
