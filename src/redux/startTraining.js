import { createSlice } from '@reduxjs/toolkit';

const startTrainingSlice = createSlice({
  name: 'startTraining', // Fixed typo here
  initialState: {
    loading: false,
    error: null,
    progress: null,
    trainingName: localStorage.getItem('trainingName') || null,
  },
  reducers: {
    startTrainingStart: (state,action) => {
      state.loading = true;
      state.error = null;
      state.trainingName = action.payload.trainingName
      localStorage.setItem('trainingName', action.payload.trainingName);
    },
    startTrainingSuccess: (state, action) => {
      state.loading = false;
      state.progress = action.payload;
    },
    startTrainingFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearTrainingName: (state) => {
      state.trainingName = null;
      localStorage.removeItem('trainingName'); // Clear from localStorage
    },
  },
});

export const { startTrainingStart, startTrainingSuccess, startTrainingFailure, clearTrainingName } = startTrainingSlice.actions;

export default startTrainingSlice.reducer;

