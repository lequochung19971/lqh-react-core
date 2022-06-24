import authReducer from '@features/Auth/authSlice';
import { EmployeeReducerType } from '@features/Employee/employeeSlice';
import { SampleReducerType } from '@features/Sample/sampleSlice';
import loadingReducer from '@store/loading/slices';
import { configureStore } from './dynamicReducers';

const staticReducers = {
  loading: loadingReducer,
  auth: authReducer,
};

export type StaticReducersType = typeof staticReducers;
export type AsyncReducersType = {
  employee: EmployeeReducerType;
  sample: SampleReducerType;
};

export const { store, reducerManager } = configureStore<StaticReducersType, AsyncReducersType>({ staticReducers });
export default store;
