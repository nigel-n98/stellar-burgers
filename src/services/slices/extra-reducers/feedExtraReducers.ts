import { TOrdersData } from '@utils-types';
import { PayloadAction, SerializedError } from '@reduxjs/toolkit';
import { FeedSliceState } from '../feedSlice';

export const feedExtraReducers = {
  pending: (state: FeedSliceState) => {
    state.isLoading = true;
    state.err = null;
  },
  fulfilled: (state: FeedSliceState, action: PayloadAction<TOrdersData>) => {
    state.feedData = action.payload;
    state.ordersList = action.payload.orders;
    state.isLoading = false;
    state.err = null;
  },
  rejected: (state: FeedSliceState, action: { error: SerializedError }) => {
    state.isLoading = false;
    state.err = action.error;
  }
};
