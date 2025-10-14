import {
  registerUserThunk,
  loginUserThunk,
  authCheckThunk,
  getUserThunk,
  updateUserThunk,
  logoutUserThunk
} from '../assync-thunk/user';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '@api';
import { deleteCookie, getCookie, setCookie } from '../../../utils/cookie';
import { setAuthVerified } from '../userSlice';

jest.mock('@api');
jest.mock('../userSlice', () => ({
  setAuthVerified: jest.fn(() => ({ type: 'user/setAuthVerified' }))
}));

jest.mock('../../../utils/cookie', () => ({
  getCookie: jest.fn(),
  setCookie: jest.fn(),
  deleteCookie: jest.fn()
}));

describe('user thunks', () => {
  const mockDispatch = jest.fn();
  const mockThunkAPI = { dispatch: mockDispatch, rejectWithValue: jest.fn() };

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('registerUserThunk вызывает registerUserApi и возвращает результат', async () => {
    const mockData = { email: 'a@a.com', password: '123', name: 'A' };
    const mockResult = { user: { email: 'a@a.com', name: 'A' } };
    (registerUserApi as jest.Mock).mockResolvedValue(mockResult);

    const result = await registerUserThunk(mockData)(mockDispatch, () => {}, undefined);

    expect(registerUserApi).toHaveBeenCalledWith(mockData);
    expect(result.payload).toEqual(mockResult);
  });

  it('loginUserThunk успешно логинит пользователя и сохраняет токены', async () => {
    const credentials = { email: 'b@b.com', password: '123' };
    const mockAuthData = {
      accessToken: 'access123',
      refreshToken: 'refresh123',
      user: { email: 'b@b.com', name: 'B' }
    };
    (loginUserApi as jest.Mock).mockResolvedValue(mockAuthData);

const result = await loginUserThunk(credentials)(
  mockDispatch,
  () => ({}),
  undefined
);

expect(loginUserApi).toHaveBeenCalledWith(credentials);
expect(setCookie).toHaveBeenCalledWith('accessToken', 'access123');
expect(localStorage.getItem('refreshToken')).toBe('refresh123');
expect(result.payload).toEqual(mockAuthData.user);
  });

it('loginUserThunk при ошибке вызывает rejectWithValue', async () => {
  const error = new Error('Ошибка логина');
  (loginUserApi as jest.Mock).mockRejectedValue(error);

  const result = await loginUserThunk({ email: 'fail', password: 'x' })(
    jest.fn(), 
    () => ({}), 
    undefined
  );

  expect(result.type).toBe('user/login/rejected');
  expect(result.payload).toBe('Ошибка логина');
});


  it('authCheckThunk вызывает getUserThunk и setAuthVerified при наличии accessToken', async () => {
    (getCookie as jest.Mock).mockReturnValue('token123');

    mockDispatch.mockImplementation(async (action: any) => {
      if (typeof action === 'function') await action(mockDispatch);
    });

    await authCheckThunk()(
  mockDispatch,
  () => ({}),
  undefined
);

    expect(mockDispatch).toHaveBeenCalledWith(expect.objectContaining({ type: 'user/setAuthVerified' }));
  });

  it('authCheckThunk вызывает только setAuthVerified, если нет accessToken', async () => {
    (getCookie as jest.Mock).mockReturnValue(undefined);

    await authCheckThunk()(
  mockDispatch,
  () => ({}),
  undefined
);

    expect(mockDispatch).toHaveBeenCalledWith(expect.objectContaining({ type: 'user/setAuthVerified' }));
  });

  it('getUserThunk вызывает getUserApi', async () => {
    const mockUser = { user: { email: 'x@x.com' } };
    (getUserApi as jest.Mock).mockResolvedValue(mockUser);

    const result = await getUserThunk()(mockDispatch, () => {}, undefined);

    expect(getUserApi).toHaveBeenCalled();
    expect(result.payload).toEqual(mockUser);
  });

  it('updateUserThunk вызывает updateUserApi', async () => {
    const updates = { name: 'New' };
    const mockResult = { user: { email: 'x@x.com', name: 'New' } };
    (updateUserApi as jest.Mock).mockResolvedValue(mockResult);

    const result = await updateUserThunk(updates)(mockDispatch, () => {}, undefined);

    expect(updateUserApi).toHaveBeenCalledWith(updates);
    expect(result.payload).toEqual(mockResult);
  });

  it('logoutUserThunk вызывает logoutApi и очищает токены', async () => {
    (logoutApi as jest.Mock).mockResolvedValue(undefined);
    localStorage.setItem('refreshToken', '123');

    await logoutUserThunk()(mockDispatch, () => {}, undefined);

    expect(logoutApi).toHaveBeenCalled();
    expect(deleteCookie).toHaveBeenCalledWith('accessToken');
    expect(localStorage.getItem('refreshToken')).toBeNull();
  });
});
