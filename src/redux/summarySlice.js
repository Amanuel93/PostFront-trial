import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  systemSummary: null,
  passFailSummary: null,
  sixMonthActivity: null,
  loading: false,
  error: null,
};

const summarySlice = createSlice({
  name: 'summary',
  initialState,
  reducers: {
    fetchSystemSummaryStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSystemSummarySuccess(state, action) {
      state.systemSummary = action.payload;
      state.loading = false;
    },
    fetchSystemSummaryFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    fetchPassFailSummaryStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchPassFailSummarySuccess(state, action) {
      state.passFailSummary = action.payload;
      state.loading = false;
    },
    fetchPassFailSummaryFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    fetchSixMonthActivityStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSixMonthActivitySuccess(state, action) {
      state.sixMonthActivity = action.payload;
      state.loading = false;
    },
    fetchSixMonthActivityFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  fetchSystemSummaryStart,
  fetchSystemSummarySuccess,
  fetchSystemSummaryFailure,
  fetchPassFailSummaryStart,
  fetchPassFailSummarySuccess,
  fetchPassFailSummaryFailure,
  fetchSixMonthActivityStart,
  fetchSixMonthActivitySuccess,
  fetchSixMonthActivityFailure,
} = summarySlice.actions;

export default summarySlice.reducer;
