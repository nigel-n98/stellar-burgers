import { userSliceState } from '../userSlice';
import { TUser } from '@utils-types';
import { SerializedError } from '@reduxjs/toolkit';

// Всего два основных типа для действий
type TUserFulfilledAction = {
  payload: TUser | { user: TUser };
};

type TRejectedAction = {
  error: SerializedError;
};

export const userExtraReducers = {
  login: {
    pending: (state: userSliceState) => {
      state.currentUser = null;
      state.authVerificationDone = false;
      state.loggedIn = false;
      state.isLoading = true;
      state.err = null;
    },
    fulfilled: (state: userSliceState, action: TUserFulfilledAction) => {
      state.currentUser =
        'user' in action.payload ? action.payload.user : action.payload;
      state.authVerificationDone = true;
      state.loggedIn = true;
      state.isLoading = false;
      state.err = null;
    },
    rejected: (state: userSliceState, action: TRejectedAction) => {
      state.currentUser = null;
      state.authVerificationDone = true;
      state.loggedIn = false;
      state.isLoading = false;
      state.err = action.error;
    }
  },
  register: {
    pending: (state: userSliceState) => {
      state.currentUser = null;
      state.authVerificationDone = false;
      state.loggedIn = false;
      state.isLoading = true;
      state.err = null;
    },
    fulfilled: (state: userSliceState, action: TUserFulfilledAction) => {
      state.currentUser =
        'user' in action.payload ? action.payload.user : action.payload;
      state.authVerificationDone = true;
      state.loggedIn = true;
      state.isLoading = false;
      state.err = null;
    },
    rejected: (state: userSliceState, action: TRejectedAction) => {
      state.currentUser = null;
      state.authVerificationDone = true;
      state.loggedIn = false;
      state.isLoading = false;
      state.err = action.error;
    }
  },
  logout: {
    pending: (state: userSliceState) => {
      state.isLoading = true;
      state.err = null;
    },
    fulfilled: (state: userSliceState) => {
      state.currentUser = null;
      state.authVerificationDone = true;
      state.loggedIn = false;
      state.isLoading = false;
      state.err = null;
    },
    rejected: (state: userSliceState, action: TRejectedAction) => {
      state.isLoading = false;
      state.err = action.error;
    }
  },
  getUser: {
    pending: (state: userSliceState) => {
      state.currentUser = null;
      state.authVerificationDone = false;
      state.loggedIn = false;
      state.isLoading = true;
      state.err = null;
    },
    fulfilled: (state: userSliceState, action: TUserFulfilledAction) => {
      state.currentUser =
        'user' in action.payload ? action.payload.user : action.payload;
      state.authVerificationDone = true;
      state.loggedIn = true;
      state.isLoading = false;
      state.err = null;
    },
    rejected: (state: userSliceState, action: TRejectedAction) => {
      state.currentUser = null;
      state.authVerificationDone = true;
      state.loggedIn = false;
      state.isLoading = false;
      state.err = action.error;
    }
  },
  updateUser: {
    pending: (state: userSliceState) => {
      state.isLoading = true;
      state.err = null;
    },
    fulfilled: (state: userSliceState, action: TUserFulfilledAction) => {
      state.currentUser =
        'user' in action.payload ? action.payload.user : action.payload;
      state.isLoading = false;
      state.err = null;
    },
    rejected: (state: userSliceState, action: TRejectedAction) => {
      state.isLoading = false;
      state.err = action.error;
    }
  }
};
