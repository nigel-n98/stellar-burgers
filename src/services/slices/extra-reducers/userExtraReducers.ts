import { userSliceState } from '../userSlice';

export const userExtraReducers = {
  login: {
    pending: (state: userSliceState) => {
      state.currentUser = null;
      state.authVerificationDone = false;
      state.loggedIn = false;
      state.isLoading = true;
      state.err = null;
    },
    fulfilled: (state: userSliceState, action: any) => {
      state.currentUser = action.payload;
      state.authVerificationDone = true;
      state.loggedIn = true;
      state.isLoading = false;
      state.err = null;
    },
    rejected: (state: userSliceState, action: any) => {
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
    fulfilled: (state: userSliceState, action: any) => {
      state.currentUser = action.payload.user;
      state.authVerificationDone = true;
      state.loggedIn = true;
      state.isLoading = false;
      state.err = null;
    },
    rejected: (state: userSliceState, action: any) => {
      state.currentUser = null;
      state.authVerificationDone = true;
      state.loggedIn = false;
      state.isLoading = false;
      state.err = action.error;
    }
  },
  logout: {
    pending: (state: userSliceState) => {
      state.currentUser = state.currentUser;
      state.authVerificationDone = state.authVerificationDone;
      state.loggedIn = true;
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
    rejected: (state: userSliceState, action: any) => {
      state.currentUser = state.currentUser;
      state.authVerificationDone = true;
      state.loggedIn = true;
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
    fulfilled: (state: userSliceState, action: any) => {
      state.currentUser = action.payload.user;
      state.authVerificationDone = true;
      state.loggedIn = true;
      state.isLoading = false;
      state.err = null;
    },
    rejected: (state: userSliceState, action: any) => {
      state.currentUser = null;
      state.authVerificationDone = true;
      state.loggedIn = false;
      state.isLoading = false;
      state.err = action.error;
    }
  },
  updateUser: {
    pending: (state: userSliceState) => {
      state.currentUser = state.currentUser;
      state.authVerificationDone = state.authVerificationDone;
      state.loggedIn = state.loggedIn;
      state.isLoading = true;
      state.err = null;
    },
    fulfilled: (state: userSliceState, action: any) => {
      state.currentUser = action.payload.user;
      state.authVerificationDone = state.authVerificationDone;
      state.loggedIn = state.loggedIn;
      state.isLoading = false;
      state.err = null;
    },
    rejected: (state: userSliceState, action: any) => {
      state.currentUser = state.currentUser;
      state.authVerificationDone = state.authVerificationDone;
      state.loggedIn = true;
      state.isLoading = false;
      state.err = action.error;
    }
  }
};
