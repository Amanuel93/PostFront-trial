import { createSlice } from '@reduxjs/toolkit';

const planSlice = createSlice({
  name: 'planning',
  initialState: {
    loading: false,
    error: null,
    successMessage: null,
    plannedTraining:[],
  },
  reducers: {
    planTrainingStart: (state) => {
      state.loading = true;
      state.error = null;
      state.successMessage = null;
    },
    planTrainingSuccess: (state, action) => {
      state.loading = false;
      state.successMessage = action.payload;
    },
    planTrainingFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchplannedTrainingsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchplannedTrainingsSuccess: (state, action) => {
      state.loading = false;
      state.plannedTraining = action.payload;
    },
    fetchplannedTrainingsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
});

export const {
  planTrainingStart,
  planTrainingSuccess,
  planTrainingFailure,
  fetchplannedTrainingsStart,
  fetchplannedTrainingsSuccess,
  fetchplannedTrainingsFailure,
  clearMessages,
} = planSlice.actions;

export default planSlice.reducer;
