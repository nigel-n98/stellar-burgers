import { SerializedError } from '@reduxjs/toolkit';
import { userOrdersSliceState } from '../userOrderSlice';
import { TOrder } from '@utils-types';

export const userOrderExtraReducers = {
  pending: (state: userOrdersSliceState) => {
    state.ordersData = [];
    state.isLoading = true;
    state.err = null;
  },
  fulfilled: (state: userOrdersSliceState, action: { payload: TOrder[] }) => {
    state.ordersData = action.payload;
    state.isLoading = false;
    state.err = null;
  },
  rejected: (
    state: userOrdersSliceState,
    action: { error: SerializedError }
  ) => {
    state.ordersData = [];
    state.isLoading = false;
    state.err = action.error;
  }
};
