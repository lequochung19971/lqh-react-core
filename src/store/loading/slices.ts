import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isPageLoading: false,
  amountOfLoadingEvent: 0,
};

const loadingSlice = createSlice({
  name: '@Loading',
  initialState,
  reducers: {
    open(state) {
      state.amountOfLoadingEvent += 1;
    },
    close(state) {
      state.amountOfLoadingEvent -= 1;
    },
  },
});

export const loadingReducer = loadingSlice.reducer;
export const pageLoading = loadingSlice.actions;