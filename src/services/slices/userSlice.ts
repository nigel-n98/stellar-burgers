import { createSlice, SerializedError } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { SLICE_NAMES } from '../../utils/constants';
import {
  fetchUserLogin,
  fetchUserRegister,
  fetchUserLogout,
  fetchGetApi,
  fetchUpdateApi
} from './assync-thunk/user';

export interface IUserState {
  user: TUser | null;
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  init: boolean;
  error: SerializedError | null;
}

export const initialState: IUserState = {
  user: null,
  isAuthChecked: false,
  isAuthenticated: false,
  init: false,
  error: null
};

export const userSlice = createSlice({
  name: SLICE_NAMES.user,
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserLogin.pending, (state) => {
        state.user = null;
        state.isAuthChecked = false;
        state.isAuthenticated = false;
        state.init = true;
        state.error = null;
      })
      .addCase(fetchUserLogin.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        state.init = false;
        state.error = null;
      })
      .addCase(fetchUserLogin.rejected, (state, action) => {
        state.user = null;
        state.isAuthChecked = true;
        state.isAuthenticated = false;
        state.init = false;
        state.error = action.error;
      })
      //////////////////////////////
      .addCase(fetchUserRegister.pending, (state) => {
        state.isAuthChecked = false;
        state.isAuthenticated = false;
        state.init = true;
        state.error = null;
      })
      .addCase(fetchUserRegister.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        state.init = false;
        state.error = null;
      })
      .addCase(fetchUserRegister.rejected, (state, action) => {
        state.user = null;
        state.isAuthChecked = true;
        state.isAuthenticated = false;
        state.init = false;
        state.error = action.error;
      })
      //////////////////////////////
      .addCase(fetchUserLogout.pending, (state) => {
        state.isAuthenticated = true;
        state.init = true;
        state.error = null;
      })
      .addCase(fetchUserLogout.fulfilled, (state, action) => {
        state.user = null;
        state.isAuthChecked = true;
        state.isAuthenticated = false;
        state.init = false;
        state.error = null;
      })
      .addCase(fetchUserLogout.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        state.init = false;
        state.error = action.error;
      })
      //////////////////////////////
      .addCase(fetchGetApi.pending, (state) => {
        state.user = null;
        state.isAuthChecked = false;
        state.isAuthenticated = false;
        state.init = true;
        state.error = null;
      })
      .addCase(fetchGetApi.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        state.init = false;
        state.error = null;
      })
      .addCase(fetchGetApi.rejected, (state, action) => {
        state.user = null;
        state.isAuthChecked = true;
        state.isAuthenticated = false;
        state.init = false;
        state.error = action.error;
      })
      //////////////////////////////
      .addCase(fetchUpdateApi.pending, (state) => {
        state.init = true;
        state.error = null;
      })
      .addCase(fetchUpdateApi.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.init = false;
      })
      .addCase(fetchUpdateApi.rejected, (state, action) => {
        state.isAuthenticated = true;
        state.init = false;
        state.error = action.error;
      });
  },
  selectors: {
    getUser: (state) => state.user,
    getAuthChecked: (state) => state.isAuthChecked,
    getAuthenticated: (state) => state.isAuthenticated,
    getUserError: (state) => state.error,
    isInit: (state) => state.init
  }
});

export const {
  getUser,
  getAuthChecked,
  getAuthenticated,
  getUserError,
  isInit
} = userSlice.selectors;
export const { authChecked } = userSlice.actions;
export default userSlice;
