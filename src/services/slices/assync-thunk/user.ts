import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteCookie, getCookie, setCookie } from '../../../utils/cookie';
import { setAuthVerified } from '../userSlice';

const removeAuthTokens = () => {
  localStorage.removeItem('refreshToken');
  deleteCookie('accessToken');
};

export const registerUserThunk = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => await registerUserApi(data)
);

export const loginUserThunk = createAsyncThunk(
  'user/login',
  async (credentials: Omit<TRegisterData, 'name'>, { rejectWithValue }) => {
    const { email, password } = credentials;
    try {
      const authData = await loginUserApi({ email, password });
      setCookie('accessToken', authData.accessToken);
      localStorage.setItem('refreshToken', authData.refreshToken);
      return authData.user;
    } catch (error: unknown) {
      const errMessage =
        error instanceof Error ? error.message : 'Unknown error';
      return rejectWithValue(errMessage);
    }
  }
);

export const authCheckThunk = createAsyncThunk(
  'user/checkAuth',
  async (_, thunkAPI) => {
    const accessToken = getCookie('accessToken');
    if (accessToken) {
      try {
        await thunkAPI.dispatch(getUserThunk());
      } finally {
        thunkAPI.dispatch(setAuthVerified());
      }
    } else {
      thunkAPI.dispatch(setAuthVerified());
    }
  }
);

export const getUserThunk = createAsyncThunk(
  'user/fetch',
  async () => await getUserApi()
);

export const updateUserThunk = createAsyncThunk(
  'user/update',
  async (updates: Partial<TRegisterData>) => await updateUserApi(updates)
);

export const logoutUserThunk = createAsyncThunk('user/logout', async () => {
  await logoutApi();
  removeAuthTokens();
});
