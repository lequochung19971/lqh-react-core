import { configureStore } from '@reduxjs/toolkit';
import { loadingReducer } from '@store/loading/slices';

const store = configureStore({
  reducer: {
    loadingReducer,
  },
});

export default store;
