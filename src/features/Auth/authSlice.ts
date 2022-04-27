import auth, { LoginParams } from '@http/auth';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  currentUser: {
    id: '',
    email: '',
  },
  status: {
    pending: false,
    success: false,
    error: false,
  },
};

export const login = createAsyncThunk('@auth/login', async ({ email, password }: LoginParams, thunkAPI) => {
  try {
    const response = await auth.login({ email, password });
    return response.data;
  } catch (error: any) {
    console.log(error.message);
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const logout = createAsyncThunk('@auth/logout', async (_, thunkAPI) => {
  try {
    return await auth.logout();
  } catch (error: any) {
    console.log(error.message);
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const getMe = createAsyncThunk('@auth/getMe', async (_, thunkAPI) => {
  try {
    const response = await auth.getMe();
    return response.data;
  } catch (error: any) {
    console.log(error.message);
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const authSlice = createSlice({
  name: '@auth',
  initialState,
  reducers: {},
  extraReducers: {
    [login.pending.toString()]: (state, _action) => {
      console.log('pending');
      state.status.pending = true;
      return state;
    },
    [login.fulfilled.toString()]: (state, action: PayloadAction<{ id: string; email: string }>) => {
      console.log('fulfilled');
      const { payload } = action;
      state.status.pending = false;
      state.status.success = true;
      state.currentUser = payload;
      return state;
    },
    [login.rejected.toString()]: (state, _action) => {
      console.log('rejected', _action);
      state.status.error = true;
      state.status.pending = false;
      state.status.success = false;
      return state;
    },
    [logout.fulfilled.toString()]: (state, _action) => {
      state.currentUser = { id: '', email: '' };
      return state;
    },
    [getMe.fulfilled.toString()]: (state, action: PayloadAction<{ id: string; email: string }>) => {
      const { payload } = action;
      state.currentUser = payload;
      return state;
    },
  },
});

export default authSlice.reducer;
