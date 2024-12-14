// src/store/trainingSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  trainings: [],
  training: null,
  loading: false,
  success: null,
  error: null,
  showNext:false,
  trainingId: null,
  trainingSubmissionStatus: null,
};

const trainingSlice = createSlice({
  name: 'training',
  initialState,
  reducers: {
    // Actions to be handled by Saga
    fetchTrainingsStart: (state) => { state.loading = true; },
    fetchTrainingsSuccess: (state, action) => {
      state.loading = false;
      state.trainings = action.payload;
    },
    fetchTrainingsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchTrainingByIdStart: (state) => { state.loading = true; },
    fetchTrainingByIdSuccess: (state, action) => {
      state.loading = false;
      state.training = action.payload;
    },
    fetchTrainingByIdFailure: (state, action) => {
      state.loading = false;
      state.success = null;
      state.error = action.payload;
    },
    resetTraining: (state,action) => {
      state.training = null;
    },
    createTrainingStart: (state) => { state.loading = true; },
    createTrainingSuccess: (state, action) => {
      state.loading = false;
      state.success = 'Training created successfully!';
      state.trainings.push(action.payload);
      state.trainingId = action.payload.id; 
      state.showNext = true;
    },
    createTrainingFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Failed to create training';
    },
    updateTrainingStart: (state) => { state.loading = true; },
    updateTrainingSuccess: (state, action) => {
      state.loading = false;
      const index = state.trainings.findIndex(t => t.id === action.payload.id);
      if (index !== -1) state.trainings[index] = action.payload;
      state.success = true;
    },
    updateTrainingFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteTrainingStart: (state) => { state.loading = true; },
    deleteTrainingSuccess: (state, action) => {
      state.loading = false;
      state.trainings = state.trainings.filter(t => t.id !== action.payload);
      state.success = true;
    },
    deleteTrainingFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    saveTrainingAnswersStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    saveTrainingAnswersSuccess: (state, action) => {
      state.loading = false;
      state.trainingSubmissionStatus = action.payload;
      state.success = true;
    },
    saveTrainingAnswersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearStatus: (state) => {
        state.success = null;
        state.error = null;
      } 
  },
});

export const {
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
  clearStatus,
  resetTraining,
} = trainingSlice.actions;

export default trainingSlice.reducer;
