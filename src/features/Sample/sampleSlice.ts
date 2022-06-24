import { createSlice } from '@reduxjs/toolkit';

const sampleSlice = createSlice({
  name: '@sample',
  initialState: {
    test: false,
  },
  reducers: {
    testReducer: (state) => {
      state.test = true;
    },
  },
});
export const { testReducer } = sampleSlice.actions;
export const sampleReducer = sampleSlice.reducer;
export type SampleReducerType = typeof sampleReducer;
