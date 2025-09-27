import { createSlice, SerializedError } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { SLICE_NAMES } from '../../utils/constants';
import { fetchUserOrders } from './assync-thunk/userOrders';

export interface IUserOrdersState {
  orders: TOrder[];
  loading: boolean;
  error: SerializedError | null;
}

export const initialState: IUserOrdersState = {
  orders: [],
  loading: false,
  error: null
};

export const userOrdersSlice = createSlice({
  name: SLICE_NAMES.userOrders,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.orders = [];
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.orders = [];
        state.loading = false;
        state.error = action.error;
      });
  },
  selectors: {
    getUserOrders: (state) => state.orders,
    isUserOrdersLoading: (state) => state.loading,
    getUserOrdersError: (state) => state.error
  }
});

export const { getUserOrders, getUserOrdersError, isUserOrdersLoading } =
  userOrdersSlice.selectors;
export default userOrdersSlice;
