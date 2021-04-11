import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  isPageLoading: false,
};

const loadingSlice = createSlice({
  name: '@Loading',
  initialState,
  reducers: {
    open(state, action: PayloadAction<boolean>) {
      state.isPageLoading = action.payload;
    },
    close(state, action: PayloadAction<boolean>) {
      state.isPageLoading = action.payload;
    },
  },
});

export default loadingSlice.reducer;
export const { open, close } = loadingSlice.actions;
