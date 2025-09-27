import { createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';
import { SLICE_NAMES } from '../../utils/constants';
import { fetchFeed } from './assync-thunk/feed';

export interface IFeedState {
  feed: TOrdersData | null;
  orders: TOrder[];
  error: SerializedError | null;
  loading: boolean;
}

export const initialState: IFeedState = {
  feed: null,
  orders: [],
  error: null,
  loading: false
};

const feedSlice = createSlice({
  name: SLICE_NAMES.feed,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchFeed.fulfilled,
        (state, action: PayloadAction<TOrdersData>) => {
          state.feed = action.payload;
          state.orders = action.payload.orders;
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(fetchFeed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
  selectors: {
    getFeed: (state) => state.feed,
    getAllOrders: (state) => state.orders,
    isFeedLoading: (state) => state.loading,
    getFeedError: (state) => state.error
  }
});

export default feedSlice;

export const { getFeed, getAllOrders, isFeedLoading, getFeedError } =
  feedSlice.selectors;
