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
import { authChecked } from '../userSlice';

export const fetchUserRegister = createAsyncThunk(
  'user/registr',
  registerUserApi
);

export const fetchUserLogin = createAsyncThunk(
  'user/login',
  async ({ email, password }: Omit<TRegisterData, 'name'>) => {
    const data = await loginUserApi({ email, password });
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const checkUserAuth = createAsyncThunk(
  'user/checkUser',
  (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      dispatch(fetchGetApi()).finally(() => {
        dispatch(authChecked());
      });
    } else {
      dispatch(authChecked());
    }
  }
);

export const fetchGetApi = createAsyncThunk('user/getApi', getUserApi);

export const fetchUpdateApi = createAsyncThunk('user/updateApi', updateUserApi);

export const fetchUserLogout = createAsyncThunk('user/logout', async () => {
  await logoutApi();
  localStorage.clear();
  deleteCookie('accessToken');
});
