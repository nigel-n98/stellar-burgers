import { createSlice, SerializedError } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';
import { REDUX_SLICES } from '../../utils/constants';
import { getFeedThunk } from './assync-thunk/feed';
import { feedExtraReducers } from './extra-reducers/feedExtraReducers';

export type FeedSliceState = {
  feedData: TOrdersData | null;
  ordersList: TOrder[];
  err: SerializedError | null;
  isLoading: boolean;
};

export const feedInitial: FeedSliceState = {
  feedData: null,
  ordersList: [],
  err: null,
  isLoading: false
};

const feedSlice = createSlice({
  name: REDUX_SLICES.feed,
  initialState: feedInitial,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFeedThunk.pending, feedExtraReducers.pending);
    builder.addCase(getFeedThunk.fulfilled, feedExtraReducers.fulfilled);
    builder.addCase(getFeedThunk.rejected, feedExtraReducers.rejected);
  },
  selectors: {
    selectFeedData: (state: FeedSliceState) => state.feedData,
    selectOrdersList: (state: FeedSliceState) => state.ordersList,
    selectIsLoading: (state: FeedSliceState) => state.isLoading,
    selectErr: (state: FeedSliceState) => state.err
  }
});

export default feedSlice;

export const { selectFeedData, selectOrdersList, selectIsLoading, selectErr } =
  feedSlice.selectors;
