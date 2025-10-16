import { createSlice, SerializedError } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { REDUX_SLICES } from '../../utils/constants';
import {
  loginUserThunk,
  registerUserThunk,
  logoutUserThunk,
  getUserThunk,
  updateUserThunk
} from './assync-thunk/user';
import { userExtraReducers } from './extra-reducers/userExtraReducers';

export type userSliceState = {
  currentUser: TUser | null;
  authVerificationDone: boolean;
  loggedIn: boolean;
  isLoading: boolean;
  err: SerializedError | null;
};

export const userInitial: userSliceState = {
  currentUser: null,
  authVerificationDone: false,
  loggedIn: false,
  isLoading: false,
  err: null
};

export const userSlice = createSlice({
  name: REDUX_SLICES.user,
  initialState: userInitial,
  reducers: {
    setAuthVerified: (state) => {
      state.authVerificationDone = true;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginUserThunk.pending, userExtraReducers.login.pending);
    builder.addCase(
      loginUserThunk.fulfilled,
      userExtraReducers.login.fulfilled
    );
    builder.addCase(loginUserThunk.rejected, userExtraReducers.login.rejected);
    builder.addCase(
      registerUserThunk.pending,
      userExtraReducers.register.pending
    );
    builder.addCase(
      registerUserThunk.fulfilled,
      userExtraReducers.register.fulfilled
    );
    builder.addCase(
      registerUserThunk.rejected,
      userExtraReducers.register.rejected
    );
    builder.addCase(logoutUserThunk.pending, userExtraReducers.logout.pending);
    builder.addCase(
      logoutUserThunk.fulfilled,
      userExtraReducers.logout.fulfilled
    );
    builder.addCase(
      logoutUserThunk.rejected,
      userExtraReducers.logout.rejected
    );
    builder.addCase(getUserThunk.pending, userExtraReducers.getUser.pending);
    builder.addCase(
      getUserThunk.fulfilled,
      userExtraReducers.getUser.fulfilled
    );
    builder.addCase(getUserThunk.rejected, userExtraReducers.getUser.rejected);
    builder.addCase(
      updateUserThunk.pending,
      userExtraReducers.updateUser.pending
    );
    builder.addCase(
      updateUserThunk.fulfilled,
      userExtraReducers.updateUser.fulfilled
    );
    builder.addCase(
      updateUserThunk.rejected,
      userExtraReducers.updateUser.rejected
    );
  },
  selectors: {
    selectCurrentUser: (state) => state.currentUser,
    selectAuthVerified: (state) => state.authVerificationDone,
    selectLoggedIn: (state) => state.loggedIn,
    selectErr: (state) => state.err,
    selectIsLoading: (state) => state.isLoading
  }
});

export const {
  selectCurrentUser,
  selectAuthVerified,
  selectLoggedIn,
  selectErr,
  selectIsLoading
} = userSlice.selectors;
export const { setAuthVerified } = userSlice.actions;
export default userSlice;
