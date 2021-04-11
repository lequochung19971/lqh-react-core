import { configureStore } from '@reduxjs/toolkit';
import loadingReducer from '@shared/slices/loadingSlices';

const store = configureStore({
  reducer: {
    loadingReducer,
  },
});

export default store;
