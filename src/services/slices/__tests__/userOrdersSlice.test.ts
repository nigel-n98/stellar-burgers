import userOrdersSlice, {
  userOrderInitial,
  selectUserOrders,
  selectIsLoading,
  selectErr
} from '../userOrderSlice';
import { getUserOrdersThunk } from '../assync-thunk/userOrders';
import { TOrder } from '@utils-types';

describe('userOrdersSlice', () => {
  const reducer = userOrdersSlice.reducer;

  const mockOrder: TOrder = {
    _id: 'ord-1',
    status: 'done',
    name: 'Test Order',
    createdAt: '2025-10-01T00:00:00.000Z',
    updatedAt: '2025-10-01T00:00:00.000Z',
    number: 111,
    ingredients: ['ing1', 'ing2']
  };

  it('возвращает initial state по умолчанию', () => {
    expect(reducer(undefined, { type: '' })).toEqual(userOrderInitial);
  });

  it('pending очищает ordersData и ставит isLoading = true', () => {
    const prev = {
      ordersData: [{ ...mockOrder }],
      isLoading: false,
      err: { name: 'e', message: 'm' } as any
    };

    const next = reducer(prev as any, { type: getUserOrdersThunk.pending.type });
    expect(next.ordersData).toEqual([]);
    expect(next.isLoading).toBe(true);
    expect(next.err).toBeNull();
  });

  it('fulfilled записывает ordersData и выключает isLoading', () => {
    const payload: TOrder[] = [mockOrder];
    const next = reducer(userOrderInitial, {
      type: getUserOrdersThunk.fulfilled.type,
      payload
    });
    expect(next.ordersData).toEqual(payload);
    expect(next.isLoading).toBe(false);
    expect(next.err).toBeNull();
  });

  it('rejected очищает ordersData и записывает ошибку', () => {
    const error = { message: 'fail' } as any;
    const prev = {
      ordersData: [{ ...mockOrder }],
      isLoading: true,
      err: null
    };

    const next = reducer(prev as any, {
      type: getUserOrdersThunk.rejected.type,
      error
    });

    expect(next.ordersData).toEqual([]);
    expect(next.isLoading).toBe(false);
    expect(next.err).toEqual(error);
  });

  it('селекторы работают с root-state (ключ = slice.name)', () => {
    const sliceState = {
      ordersData: [mockOrder],
      isLoading: false,
      err: null
    };

    const rootState: any = { [userOrdersSlice.name]: sliceState };

    expect(selectUserOrders(rootState)).toEqual(sliceState.ordersData);
    expect(selectIsLoading(rootState)).toEqual(sliceState.isLoading);
    expect(selectErr(rootState)).toEqual(sliceState.err);
  });
});
