import { feedInitial } from '../feedSlice';
import feedSlice from '../feedSlice';
import { getFeedThunk } from '../assync-thunk/feed';
import { TOrdersData, TOrder } from '@utils-types';

describe('feedSlice', () => {
  const reducer = feedSlice.reducer;

  const mockOrder: TOrder = {
    _id: '1',
    status: 'done',
    name: 'Тестовый бургер',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    number: 12345,
    ingredients: ['ingr1', 'ingr2']
  };

  const mockFeedData: TOrdersData = {
    orders: [mockOrder],
    total: 100,
    totalToday: 10
  };

  it('должен вернуть initial state по умолчанию', () => {
    expect(reducer(undefined, { type: '' })).toEqual(feedInitial);
  });

  it('pending должен установить isLoading = true и err = null', () => {
    const state = reducer(feedInitial, { type: getFeedThunk.pending.type });
    expect(state.isLoading).toBe(true);
    expect(state.err).toBeNull();
  });

  it('fulfilled должен записать feedData, ordersList и снять isLoading', () => {
    const state = reducer(feedInitial, {
      type: getFeedThunk.fulfilled.type,
      payload: mockFeedData
    });

    expect(state.feedData).toEqual(mockFeedData);
    expect(state.ordersList).toEqual(mockFeedData.orders);
    expect(state.isLoading).toBe(false);
    expect(state.err).toBeNull();
  });

  it('rejected должен записать ошибку и снять isLoading', () => {
    const mockError = { message: 'Ошибка загрузки' };
    const state = reducer(feedInitial, {
      type: getFeedThunk.rejected.type,
      error: mockError
    });

    expect(state.isLoading).toBe(false);
    expect(state.err).toEqual(mockError);
  });
});
