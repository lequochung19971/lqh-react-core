import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@store/types';

const initialState = {
  isPageLoading: false,
};

const loadingSlice = createSlice({
  name: '@Loading',
  initialState,
  reducers: {
    open(state) {
      state.isPageLoading = true;
    },
    close(state) {
      state.isPageLoading = false;
    },
  },
});

export default loadingSlice.reducer;
export const pageLoading = loadingSlice.actions;

export const selectIsPageLoading = (state: RootState): boolean => state.loadingReducer.isPageLoading;
