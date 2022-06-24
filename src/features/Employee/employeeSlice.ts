import { createSlice } from '@reduxjs/toolkit';

const employeeSlice = createSlice({
  name: '@employee',
  initialState: {
    test: false,
  },
  reducers: {
    testReducer: (state) => {
      state.test = true;
    },
  },
});

export const { testReducer } = employeeSlice.actions;
export const employeeReducer = employeeSlice.reducer;
export type EmployeeReducerType = typeof employeeReducer;
