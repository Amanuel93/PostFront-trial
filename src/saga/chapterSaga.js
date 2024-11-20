import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchChaptersStart,
  fetchChaptersSuccess,
  fetchChaptersFailure,
  fetchChapterByIdStart,
  fetchChapterByIdSuccess,
  fetchChapterByIdFailure,
  fetchTrainingChapterByIdStart,
  fetchTrainingChapterByIdSuccess,
  fetchTrainingChapterByIdFailure,
  createChapterStart,
  createChapterSuccess,
  createChapterFailure,
  updateChapterStart,
  updateChapterSuccess,
  updateChapterFailure,
  deleteChapterStart,
  deleteChapterSuccess,
  deleteChapterFailure,
} from '../redux/chapterSlice';
import axiosInstance from '@/utility/axiosInstance'; // Assuming `axiosInstance` is set up to handle requests

// Fetch all chapters
function* fetchChaptersSaga() {
  try {
    const response = yield call(axiosInstance.get, '/chapters');
    yield put(fetchChaptersSuccess(response.data));
  } catch (error) {
    yield put(fetchChaptersFailure(error.message));
  }
}

function* createChapterSaga(action) {
    try {
      const formData = new FormData();
      formData.append('title', action.payload.title);
      formData.append('chapterNumber', action.payload.chapterNumber);
      formData.append('readingMaterial', action.payload.readingMaterial);
      formData.append('trainingId', action.payload.traininId);
    //   const { trainingId } = action.payload;
    //   console.log(trainingId)
  
      const url = `admin/createChapter/${action.payload.trainingId}`;
      console.log("Training ID:", action.payload.trainingId);
  
      const response = yield call(axiosInstance.post, url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const { id, ...chapterData } = response.data;
      
      yield put(createChapterSuccess({id, ...chapterData}));
      console.log(response.data.id)
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
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

  function* fetchChapterByIdSaga(action) {
    try {
      const { id } = action.payload;
      const url = `admin/getChapter/${id}`;
      // console.log(id)
      // Correcting the axiosInstance.get call by passing url in parentheses
      const response = yield call(axiosInstance.get, url);
      yield put(fetchChapterByIdSuccess(response.data));
      console.log(response.data)
    } catch (error) {
      yield put(fetchChapterByIdFailure(error.message));
    }
  }

  function* fetchTrainingChapterByIdSaga(action) {
    try {
      const { id } = action.payload;
      const url = `admin/getAllChapter/${id}`;
      // console.log(id)
      // Correcting the axiosInstance.get call by passing url in parentheses
      const response = yield call(axiosInstance.get, url);
      yield put(fetchTrainingChapterByIdSuccess(response.data));
      console.log(response.data)
    } catch (error) {
      yield put(fetchTrainingChapterByIdFailure(error.message));
    }
  }
  
// Update a chapter
function* updateChapterSaga(action) {
  try {
    const { id, title, chapterNumber, readingMaterial } = action.payload;
    const formData = new FormData();
    if (title) formData.append('title', title);
    if (chapterNumber) formData.append('chapterNumber', chapterNumber);
    if (readingMaterial) formData.append('readingMaterial', readingMaterial);

    const response = yield call(axiosInstance.put, `/chapters/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    yield put(updateChapterSuccess(response.data));
  } catch (error) {
    yield put(updateChapterFailure(error.message));
  }
}

// Delete a chapter
function* deleteChapterSaga(action) {
  try {
    yield call(axiosInstance.delete, `/chapters/${action.payload}`);
    yield put(deleteChapterSuccess(action.payload));
  } catch (error) {
    yield put(deleteChapterFailure(error.message));
  }
}

// Watcher saga
export default function* chapterSaga() {
  yield takeLatest(fetchChaptersStart.type, fetchChaptersSaga);
  yield takeLatest(fetchChapterByIdStart.type, fetchChapterByIdSaga);
  yield takeLatest(fetchTrainingChapterByIdStart.type, fetchTrainingChapterByIdSaga);
  yield takeLatest(createChapterStart.type, createChapterSaga);
  yield takeLatest(updateChapterStart.type, updateChapterSaga);
  yield takeLatest(deleteChapterStart.type, deleteChapterSaga);
}
