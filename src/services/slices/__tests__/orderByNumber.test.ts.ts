import { getOrderByNumberThunk } from '../assync-thunk/orderByNumber';
import { getOrderByNumberApi } from '@api';
import { TOrder } from '@utils-types';

jest.mock('@api', () => ({
  getOrderByNumberApi: jest.fn()
}));

const mockedGetOrderByNumberApi = getOrderByNumberApi as jest.Mock;

describe('getOrderByNumberThunk', () => {
  const orderNumber = 1234;
  const mockOrder: TOrder = {
    _id: '1',
    number: orderNumber,
    name: 'Test Burger',
    status: 'done',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    ingredients: ['id1', 'id2']
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('должен вернуть заказ при успешном ответе API', async () => {
    mockedGetOrderByNumberApi.mockResolvedValue({
      success: true,
      orders: [mockOrder]
    });

    const thunk = getOrderByNumberThunk(orderNumber);
    const dispatch = jest.fn();
    const getState = jest.fn();
    const result = await thunk(dispatch, getState, undefined);

    expect(mockedGetOrderByNumberApi).toHaveBeenCalledWith(orderNumber);
    expect(result.type).toBe('orders/fetchByNumber/fulfilled');
    expect(result.payload).toEqual(mockOrder);
  });

  it('должен отклониться, если заказ не найден', async () => {
    mockedGetOrderByNumberApi.mockResolvedValue({
      success: true,
      orders: []
    });

    const thunk = getOrderByNumberThunk(orderNumber);
    const dispatch = jest.fn();
    const getState = jest.fn();
    const result = await thunk(dispatch, getState, undefined);

    expect(result.type).toBe('orders/fetchByNumber/rejected');
    expect(result.payload).toBe('Order not found');
  });

  it('должен отклониться при ошибке API', async () => {
    mockedGetOrderByNumberApi.mockRejectedValue(new Error('Network error'));

    const thunk = getOrderByNumberThunk(orderNumber);
    const dispatch = jest.fn();
    const getState = jest.fn();
    const result = await thunk(dispatch, getState, undefined);

    expect(result.type).toBe('orders/fetchByNumber/rejected');
    expect(result.payload).toEqual(new Error('Network error'));
  });
});
