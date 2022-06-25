import authReducer from '@features/Auth/authSlice';
import { EmployeeReducerType } from '@features/Employee/employeeSlice';
import { SampleReducerType } from '@features/Sample/sampleSlice';
import { UserReducerType } from '@features/User/userSlice';
import loadingReducer from '@store/loading/slices';
import { configureStore } from './dynamicReducers';

const initialReducers = {
  loading: loadingReducer,
  auth: authReducer,
};

export type InitialReducersType = typeof initialReducers;
export type AsyncReducersType = {
  employee: EmployeeReducerType;
  sample: SampleReducerType;
  user: UserReducerType;
};

export type CurrentReducersType = typeof initialReducers & AsyncReducersType;

export const { store, reducerManager } = configureStore({ initialReducers } as {
  initialReducers: CurrentReducersType;
});

export default store;
