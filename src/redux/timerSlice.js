import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  timeLeft: 0, // Initial time left in milliseconds
  timeUp: false, // Flag to indicate if time is up
  answers:[]
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    setTimeLeft: (state, action) => {
      state.timeLeft = action.payload;
    },
    setTimeUp: (state, action) => {
      state.timeUp = action.payload;
    },
    setTrainingAnswers: (state,action) => {
     state.answers = action.payload;
    },
    resetTrainingAnswer:(state,action) => {
      state.answers = []
    },
    resetTimer: (state) => {
      state.timeLeft = 0;
      state.timeUp = false;
    },
  },
});

export const { setTimeLeft, setTimeUp, setTrainingAnswers, resetTimer,resetTrainingAnswer } = timerSlice.actions;
export const selectTimeLeft = (state) => state.timer.timeLeft;
export const selectTimeUp = (state) => state.timer.timeUp;

export default timerSlice.reducer;
