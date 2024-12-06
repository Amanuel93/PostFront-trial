// features/trainees/traineeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  trainees: [],
  traineeInfo: null,
  trainee:null,
  trainings:null,
  loading: false,
  error: null,
};

const traineeSlice = createSlice({
  name: 'trainees',
  initialState,
  reducers: {
    fetchTraineeStart(state) {
      state.loading = true;
      state.error = null;
      },
    fetchTraineeSuccess(state, action) {
      state.loading = false;
      state.trainee = action.payload.trainee;
      },
    fetchTraineeFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
      },
    fetchAllTraineesStart(state) {
      state.loading = true;
      state.error = null;
     },
    fetchAllTraineesSuccess(state, action) {
      state.loading = false;
      state.trainees = action.payload;
     },
    fetchAllTraineesFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchTraineeInfoStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchTraineeInfoSuccess(state, action) {
      state.loading = false;
      state.traineeInfo = action.payload;
    },
    fetchTraineeInfoFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchTraineesTrainingStart(state) {
      state.loading = true;
      state.error = null;
      },
    fetchTraineesTrainingSuccess(state, action) {
      state.loading = false;
      state.trainings = action.payload.data;
      },
    fetchTraineesTrainingFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
      },
  },
});

export const {
  fetchTraineeStart,
  fetchTraineeSuccess,
  fetchTraineeFailure,
  fetchAllTraineesStart,
  fetchAllTraineesSuccess,
  fetchAllTraineesFailure,
  fetchTraineeInfoStart,
  fetchTraineeInfoSuccess,
  fetchTraineeInfoFailure,
  fetchTraineesTrainingStart,
  fetchTraineesTrainingSuccess,
  fetchTraineesTrainingFailure,
} = traineeSlice.actions;

export default traineeSlice.reducer;
