import { createSlice } from '@reduxjs/toolkit';

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    admins: [],
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    createAdminStart(state) {
      state.loading = true;
      state.error = null;
      state.successMessage = null;
    },
    createAdminSuccess(state, action) {
      state.loading = false;
      state.successMessage = action.payload.message;
      state.admins.push(action.payload.admin);
    },
    createAdminFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteAdminStart(state) {
      state.loading = true;
      state.error = null;
      state.successMessage = null;
    },
    deleteAdminSuccess(state, action) {
      state.loading = false;
      state.successMessage = action.payload.message;
      state.admins = state.admins.filter((admin) => admin.id !== action.payload.id);
    },
    deleteAdminFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    getAdminsStart(state) {
      state.loading = true;
      state.error = null;
    },
    getAdminsSuccess(state, action) {
      state.loading = false;
      state.admins = action.payload;
    },
    getAdminsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearStatus: (state) => {
      state.successMessage = null;
      state.error = null;
    } 
  },
});

export const {
  createAdminStart,
  createAdminSuccess,
  createAdminFailure,
  deleteAdminStart,
  deleteAdminSuccess,
  deleteAdminFailure,
  getAdminsStart,
  getAdminsSuccess,
  getAdminsFailure,
  clearStatus,
} = adminSlice.actions;

export default adminSlice.reducer;

