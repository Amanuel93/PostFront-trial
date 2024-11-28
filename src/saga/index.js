// sagas.js
import { all } from 'redux-saga/effects';
import authSaga from './authSaga'; // Import your auth saga
import trainingSaga from './trainingSaga';
import chapterSaga from './chapterSaga';
import questionSaga from './questionSaga';
import startTrainingSaga from './startSaga'
import  adminSaga  from './createAdminSaga';
import traineeSaga from './traineeSaga'
import summarySaga from './summarySaga';
import planSaga from './planSaga'


export default function* rootSaga() {
  yield all([
    authSaga(),
    trainingSaga(),
    chapterSaga(),
    questionSaga(),
    startTrainingSaga(),
    adminSaga(),
    traineeSaga(),
    summarySaga(),
    planSaga(),
  ]);
}
