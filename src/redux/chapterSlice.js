import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chapters: [],
  chapter: null,
  loading: false,
  success: null,
  error: null,
  showNext:false,
  chapterId: null,
  trainingChapter:[],
};

const chapterSlice = createSlice({
  name: 'chapter',
  initialState,
  reducers: {
    // Actions to be handled by Saga
    fetchChaptersStart: (state) => { state.loading = true; },
    fetchChaptersSuccess: (state, action) => {
      state.loading = false;
      state.chapters = action.payload;
    },
    fetchChaptersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchChapterByIdStart: (state) => { state.loading = true; },
    fetchChapterByIdSuccess: (state, action) => {
      state.loading = false;
      state.chapter = action.payload;
    },
    fetchChapterByIdFailure: (state, action) => {
      state.loading = false;
      state.success = null;
      state.error = action.payload;
    },
    fetchTrainingChapterByIdStart: (state) => { state.loading = true; },
    fetchTrainingChapterByIdSuccess: (state, action) => {
      state.loading = false;
      state.trainingChapter = action.payload;
    },
    fetchTrainingChapterByIdFailure: (state, action) => {
      state.loading = false;
      state.success = null;
      state.error = action.payload;
    },
    createChapterStart: (state) => { state.loading = true; },
    createChapterSuccess: (state, action) => {
      state.loading = false;
      state.success = 'Chapter created successfully';
      state.chapters.push(action.payload);
      state.chapterId = action.payload.id; 
      state.showNext = true;
    },
    createChapterFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Failed to create chapter';
    },
    updateChapterStart: (state) => { state.loading = true; },
    updateChapterSuccess: (state, action) => {
      state.loading = false;
      const index = state.chapters.findIndex(c => c.id === action.payload.id);
      if (index !== -1) state.chapters[index] = action.payload;
    },
    updateChapterFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteChapterStart: (state) => { state.loading = true; },
    deleteChapterSuccess: (state, action) => {
      state.loading = false;
      state.chapters = state.chapters.filter(c => c.id !== action.payload);
    },
    deleteChapterFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearStatus: (state) => {
      state.success = null;
      state.error = null;
    },
    resetChapter: (state) => {
      state.chapter = null;
    },
  },
});

export const {
  fetchChaptersStart,
  fetchChaptersSuccess,
  fetchChaptersFailure,
  fetchChapterByIdStart,
  fetchChapterByIdSuccess,
  fetchChapterByIdFailure,
  fetchTrainingChapterByIdStart,
  fetchTrainingChapterByIdSuccess,
  fetchTrainingChapterByIdFailure,
  createChapterStart,
  createChapterSuccess,
  createChapterFailure,
  updateChapterStart,
  updateChapterSuccess,
  updateChapterFailure,
  deleteChapterStart,
  deleteChapterSuccess,
  deleteChapterFailure,
  clearStatus,
  resetChapter,
} = chapterSlice.actions;

export default chapterSlice.reducer;
