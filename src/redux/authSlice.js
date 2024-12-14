
import { createSlice } from '@reduxjs/toolkit';
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    // Parse user from localStorage (if available), otherwise default to an empty object
    user: JSON.parse(localStorage.getItem('user')) || [],
    loading: false,
    error: null,
    successMessage: null,
    profile:null
  },
  reducers: {
    registerUserStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    registerUserSuccess: (state, action) => {
      state.loading = false;
      state.successMessage = 'Successfully registered'
    },
    registerUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    loginUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginUserSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      // Save user to localStorage as a string
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    loginUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token'); // Clear token from localStorage if required
      localStorage.removeItem('timeLeft'); // Clear token from localStorage if required
    },
    resetPasswordStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    resetPasswordSuccess: (state, action) => {
      state.loading = false;
      state.successMessage = action.payload.successMessage;
    },
    resetPasswordFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    sendResetPasswordStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    sendResetPasswordSuccess: (state, action) => {
      state.loading = false;
      state.successMessage = action.payload.successMessage;
    },
    sendResetPasswordFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    completeProfileStart: (state) => {
      state.loading = true;
      state.error = null;
      state.successMessage = '';
    },
    completeProfileSuccess: (state, action) => {
      state.loading = false;
      state.successMessage = action.payload.message;
    },
    completeProfileFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },
    getProfileStart: (state) => {
      state.loading = true;
      state.error = null;
      state.successMessage = '';
    },
    getProfileSuccess: (state, action) => {
      state.loading = false;
      state.profile = action.payload;
    },
    getProfileFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },
    resetError: (state) => {
      state.error = null;
    }
  },
});

// Export actions
export const {
  registerUserStart,
  registerUserSuccess,
  registerUserFailure,
  loginUserStart,
  loginUserSuccess,
  loginUserFailure,
  logoutUser,
  sendResetPasswordStart,
  sendResetPasswordSuccess,
  sendResetPasswordFailure,
  resetPasswordStart,
  resetPasswordSuccess,
  resetPasswordFailure,
  completeProfileStart,
  completeProfileSuccess,
  completeProfileFailure,
  getProfileStart,
  getProfileSuccess,
  getProfileFailure,
  resetError,
} = authSlice.actions;

// Export reducer
export default authSlice.reducer;

