// store.js
// redux/index.js
import { combineReducers } from '@reduxjs/toolkit';
import stepperReducer from './stepperSlice';
import authReducer from './authSlice';
import trainingReducer from './trainingSlice'
import chapterReducer from './chapterSlice'
import questionReducer from './questionSlice'
import startTrainingReducer from './startTraining'
import AdminReducer from './createAdminSlice'

const rootReducer = combineReducers({
  stepper: stepperReducer,
  auth: authReducer,
  training: trainingReducer,
  chapter: chapterReducer,
  questions: questionReducer,
  startTraining: startTrainingReducer,
  admin: AdminReducer,
});

export default rootReducer;

