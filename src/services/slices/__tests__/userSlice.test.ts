import userSlice, {
  userInitial,
  setAuthVerified,
  selectCurrentUser,
  selectAuthVerified,
  selectLoggedIn,
  selectErr,
  selectIsLoading
} from '../userSlice';
import {
  loginUserThunk,
  registerUserThunk,
  logoutUserThunk,
  getUserThunk,
  updateUserThunk
} from '../assync-thunk/user';
import { TUser } from '@utils-types';

describe('userSlice — редьюсер и экстра-редьюсеры', () => {
  const reducer = userSlice.reducer;

  it('должен возвращать начальное состояние по умолчанию', () => {
    expect(reducer(undefined, { type: '' })).toEqual(userInitial);
  });

  it('setAuthVerified должен выставлять authVerificationDone = true', () => {
    const next = reducer(userInitial, setAuthVerified());
    expect(next.authVerificationDone).toBe(true);
  });

  it('loginUserThunk.pending устанавливает isLoading = true и err = null', () => {
    const next = reducer(userInitial, { type: loginUserThunk.pending.type });
    expect(next.isLoading).toBe(true);
    expect(next.err).toBeNull();
  });

  it('loginUserThunk.fulfilled устанавливает currentUser, loggedIn и authVerificationDone', () => {
    const mockUser: TUser = { email: 'a@a.com', name: 'A' };
    const next = reducer(userInitial, {
      type: loginUserThunk.fulfilled.type,
      payload: mockUser
    });
    expect(next.currentUser).toEqual(mockUser);
    expect(next.loggedIn).toBe(true);
    expect(next.authVerificationDone).toBe(true);
    expect(next.isLoading).toBe(false);
    expect(next.err).toBeNull();
  });

  it('loginUserThunk.rejected записывает ошибку и выставляет authVerificationDone = true', () => {
    const error = { message: 'login error' } as any;
    const next = reducer(userInitial, {
      type: loginUserThunk.rejected.type,
      error
    });
    expect(next.err).toEqual(error);
    expect(next.loggedIn).toBe(false);
    expect(next.authVerificationDone).toBe(true);
    expect(next.isLoading).toBe(false);
  });

  it('registerUserThunk.pending устанавливает isLoading = true', () => {
    const next = reducer(userInitial, { type: registerUserThunk.pending.type });
    expect(next.isLoading).toBe(true);
    expect(next.err).toBeNull();
  });

  it('registerUserThunk.fulfilled сохраняет user (payload.user) и ставит loggedIn', () => {
    const payload = { user: { email: 'r@r.com', name: 'R' } as TUser };
    const next = reducer(userInitial, {
      type: registerUserThunk.fulfilled.type,
      payload
    });
    expect(next.currentUser).toEqual(payload.user);
    expect(next.loggedIn).toBe(true);
    expect(next.authVerificationDone).toBe(true);
    expect(next.isLoading).toBe(false);
    expect(next.err).toBeNull();
  });

  it('registerUserThunk.rejected записывает ошибку', () => {
    const error = { message: 'register error' } as any;
    const next = reducer(userInitial, {
      type: registerUserThunk.rejected.type,
      error
    });
    expect(next.err).toEqual(error);
    expect(next.loggedIn).toBe(false);
    expect(next.authVerificationDone).toBe(true);
    expect(next.isLoading).toBe(false);
  });

  it('logoutUserThunk.pending ставит isLoading = true (при попытке выхода)', () => {
    const next = reducer(userInitial, { type: logoutUserThunk.pending.type });
    expect(next.isLoading).toBe(true);
    expect(next.err).toBeNull();
  });

  it('logoutUserThunk.fulfilled сбрасывает currentUser и loggedIn', () => {
    const state = {
      ...userInitial,
      currentUser: { email: 'x@x', name: 'X' },
      loggedIn: true
    };
    const next = reducer(state, { type: logoutUserThunk.fulfilled.type });
    expect(next.currentUser).toBeNull();
    expect(next.loggedIn).toBe(false);
    expect(next.authVerificationDone).toBe(true);
    expect(next.isLoading).toBe(false);
    expect(next.err).toBeNull();
  });

  it('logoutUserThunk.rejected записывает ошибку и не разлогинивает (сохраняет loggedIn=true)', () => {
    const state = {
      ...userInitial,
      currentUser: { email: 'x@x', name: 'X' },
      loggedIn: true
    };
    const error = { message: 'logout failed' } as any;
    const next = reducer(state, { type: logoutUserThunk.rejected.type, error });
    expect(next.err).toEqual(error);
    expect(next.loggedIn).toBe(true);
    expect(next.isLoading).toBe(false);
  });

  it('getUserThunk.pending устанавливает isLoading = true', () => {
    const next = reducer(userInitial, { type: getUserThunk.pending.type });
    expect(next.isLoading).toBe(true);
    expect(next.err).toBeNull();
  });

  it('getUserThunk.fulfilled записывает payload.user в currentUser и loggedIn = true', () => {
    const payload = { user: { email: 'g@g.com', name: 'G' } as TUser };
    const next = reducer(userInitial, {
      type: getUserThunk.fulfilled.type,
      payload
    });
    expect(next.currentUser).toEqual(payload.user);
    expect(next.loggedIn).toBe(true);
    expect(next.authVerificationDone).toBe(true);
    expect(next.isLoading).toBe(false);
    expect(next.err).toBeNull();
  });

  it('getUserThunk.rejected записывает ошибку и authVerificationDone = true', () => {
    const error = { message: 'get user failed' } as any;
    const next = reducer(userInitial, {
      type: getUserThunk.rejected.type,
      error
    });
    expect(next.err).toEqual(error);
    expect(next.authVerificationDone).toBe(true);
    expect(next.loggedIn).toBe(false);
    expect(next.isLoading).toBe(false);
  });

  it('updateUserThunk.pending ставит isLoading = true', () => {
    const state = {
      ...userInitial,
      currentUser: { email: 'old@o', name: 'Old' },
      loggedIn: true
    };
    const next = reducer(state, { type: updateUserThunk.pending.type });
    expect(next.isLoading).toBe(true);
    expect(next.err).toBeNull();
  });

  it('updateUserThunk.fulfilled обновляет currentUser через payload.user', () => {
    const state = {
      ...userInitial,
      currentUser: { email: 'old@o', name: 'Old' },
      loggedIn: true
    };
    const payload = { user: { email: 'new@n', name: 'New' } as TUser };
    const next = reducer(state, {
      type: updateUserThunk.fulfilled.type,
      payload
    });
    expect(next.currentUser).toEqual(payload.user);
    expect(next.isLoading).toBe(false);
    expect(next.err).toBeNull();
  });

  it('updateUserThunk.rejected записывает ошибку и оставляет loggedIn = true', () => {
    const state = {
      ...userInitial,
      currentUser: { email: 'old@o', name: 'Old' },
      loggedIn: true
    };
    const error = { message: 'update failed' } as any;
    const next = reducer(state, { type: updateUserThunk.rejected.type, error });
    expect(next.err).toEqual(error);
    expect(next.loggedIn).toBe(true);
    expect(next.isLoading).toBe(false);
  });

  it('селекторы selectCurrentUser/selectAuthVerified/selectLoggedIn/selectErr/selectIsLoading работают с root-state', () => {
    const sliceState = {
      ...userInitial,
      currentUser: { email: 's@u', name: 'S' } as TUser,
      authVerificationDone: true,
      loggedIn: true
    };
    const rootState: any = { [userSlice.name]: sliceState };

    expect(selectCurrentUser(rootState)).toEqual(sliceState.currentUser);
    expect(selectAuthVerified(rootState)).toEqual(
      sliceState.authVerificationDone
    );
    expect(selectLoggedIn(rootState)).toEqual(sliceState.loggedIn);
    expect(selectErr(rootState)).toEqual(sliceState.err);
    expect(selectIsLoading(rootState)).toEqual(sliceState.isLoading);
  });
});
