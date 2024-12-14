//authSaga.js
import { call, put,select, takeLatest } from 'redux-saga/effects';
import { 
  registerUserStart, 
  registerUserSuccess, 
  registerUserFailure, 
  loginUserStart, 
  loginUserSuccess, 
  loginUserFailure,
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
} from '../redux/authSlice';
import axiosInstance from '@/utility/axiosInstance'; // Import your API functions

function* registerUser(action) {
  try {
    const response = yield call(axiosInstance.post, 'auth/register', action.payload);

    yield put(registerUserSuccess(response.data));
  } catch (error) {
    yield put(registerUserFailure(error.response.data.message));
  }
}

function* loginUser(action) {
  try {
    const response = yield call(axiosInstance.post, 'auth/login', action.payload);
    console.log(action.payload);
    localStorage.setItem('token', response.data.token);
    // Save user data in localStorage as a string
    localStorage.setItem('user', JSON.stringify(response.data.userResponse));
    yield put(loginUserSuccess(response.data.userResponse));
    console.log(response.data.userResponse.role);
    console.log(response.data.token);
  } catch (error) {
    yield put(loginUserFailure(error.response?.data?.message));
  }
}

function* sendResetPassword(action) {
  try {
    console.log("Reset password request payload:", action.payload); // Log request payload
    const response = yield call(axiosInstance.post, 'auth/forgot-password', action.payload);
    console.log("Reset password response:", response); // Log response
    yield put(sendResetPasswordSuccess({ successMessage: response.data.message, token:response.data.resetToken }));
  } catch (error) {
    console.log("Reset password error:", error); // Log error
    yield put(sendResetPasswordFailure(error.response?.data?.message || 'Password reset failed'));
  }
}

function* ResetPassword(action) {
  try {
    console.log("Reset password request payload:", action.payload); // Log request payload
    const { token, password } = action.payload;
    
    // Construct the URL with the token
    const url = `auth/reset-password/${token}`;
    
    // Make the POST request to reset the password
    const response = yield call(axiosInstance.post, url, { newPassword:password });
    console.log("Reset password response:", response); // Log response
    
    // Dispatch success action with the response message
    yield put(resetPasswordSuccess({ successMessage: response.data.message }));
  } catch (error) {
    console.log("Reset password error:", error); // Log error
    
    // Dispatch failure action with the error message
    yield put(resetPasswordFailure(error.response?.data?.message));
  }
}

function* completeProfile(action) {
  try {
    const formData = new FormData();
    formData.append('department', action.payload.department);
    formData.append('position', action.payload.position);
    formData.append('branch', action.payload.branch);
    formData.append('gender', action.payload.gender);
    formData.append('years_of_experience', action.payload.years_of_experience);
    formData.append('experience_detail', action.payload.experience_detail);
    formData.append('bio', action.payload.bio);
    formData.append('birthplace', action.payload.birthplace);
    formData.append('image', action.payload.image); // Ensure the file is directly appended here

    const response = yield call(axiosInstance.post, 'trainee/complete', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    yield put(completeProfileSuccess(response.data));
  } catch (error) {
    yield put(completeProfileFailure(error.response?.data || { error: 'Failed to complete profile' }));
  }
}

function* getProfileSaga(action) {
  try {
    // Correcting the axiosInstance.get call by passing url in parentheses
    const response = yield call(axiosInstance.get, 'trainee/getProfile');
    yield put(getProfileSuccess(response.data.profile));
    console.log(response.data)
  } catch (error) {
    yield put(getProfileFailure(error.message));
  }
}

// Watcher Saga
export default function* authSaga() {
  yield takeLatest('auth/registerUserStart', registerUser);
  yield takeLatest('auth/loginUserStart', loginUser);
  yield takeLatest('auth/sendResetPasswordStart', sendResetPassword);
  yield takeLatest('auth/resetPasswordStart', ResetPassword);
  yield takeLatest('auth/completeProfileStart',completeProfile);
  yield takeLatest('auth/getProfileStart',getProfileSaga);
}




