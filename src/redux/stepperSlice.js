// stepperSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeStep: 0,
  steps: 3, // Total steps (can be dynamic)
};

const stepperSlice = createSlice({
  name: 'stepper',
  initialState,
  reducers: {
    setActiveStep: (state, action) => {
      state.activeStep = action.payload;
    },
    nextStep: (state) => {
      if (state.activeStep < state.steps - 1) {
        state.activeStep += 1;
      }
    },
    prevStep: (state) => {
      if (state.activeStep > 0) {
        state.activeStep -= 1;
      }
    },
  },
});

export const { setActiveStep, nextStep, prevStep } = stepperSlice.actions;

export default stepperSlice.reducer;
