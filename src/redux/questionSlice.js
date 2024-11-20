// src/slices/questionSlice.js
import { createSlice } from '@reduxjs/toolkit';

const questionSlice = createSlice({
  name: 'questions',
  initialState: {
    questions: [],
    loading: false,
    error: null,
    showNext:false,
    success:null,
  },
  reducers: {
    createQuestionStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createQuestionSuccess: (state, action) => {
      state.loading = false;
      state.questions.push(action.payload);
      state.success = 'Questions created successfully';
      state.showNext = true;
    },
    createQuestionFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateQuestionStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateQuestionSuccess: (state, action) => {
      state.loading = false;
      const index = state.questions.findIndex(q => q.id === action.payload.id);
      if (index !== -1) state.questions[index] = action.payload;
    },
    updateQuestionFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteQuestionStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteQuestionSuccess: (state, action) => {
      state.loading = false;
      state.questions = state.questions.filter(q => q.id !== action.payload);
    },
    deleteQuestionFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const {
  createQuestionStart,
  createQuestionSuccess,
  createQuestionFailure,
  updateQuestionStart,
  updateQuestionSuccess,
  updateQuestionFailure,
  deleteQuestionStart,
  deleteQuestionSuccess,
  deleteQuestionFailure
} = questionSlice.actions;

export default questionSlice.reducer;
