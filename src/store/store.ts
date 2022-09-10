import authReducer from '@features/Auth/authSlice';
import { EmployeeReducerType } from '@features/Employee/employeeSlice';
import { SampleReducerType } from '@features/Sample/sampleSlice';
import { UserReducerType } from '@features/User/userSlice';
import loadingReducer from '@store/loading/slices';
import { apiSlice } from './apiSlice';
import { configureStore } from './dynamicReducers';

const staticReducers = {
  loading: loadingReducer,
  auth: authReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
};

export type StaticReducersType = typeof staticReducers;
export type AsyncReducersType = {
  employee: EmployeeReducerType;
  sample: SampleReducerType;
  user: UserReducerType;
};

export type AllReducersType = StaticReducersType & AsyncReducersType;
const initialReducers: AllReducersType = staticReducers as AllReducersType;

export const { store, reducerManager } = configureStore({
  initialReducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
