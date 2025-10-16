import { createSlice, SerializedError } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { REDUX_SLICES } from '../../utils/constants';
import { getUserOrdersThunk } from './assync-thunk/userOrders';
import { userOrderExtraReducers } from './extra-reducers/userOrderExtraReducers';
import { getOrderByNumberThunk } from './assync-thunk/orderByNumber';
import { orderHandlers } from './extra-reducers/userOrderExtraReducers';

export type userOrdersSliceState = {
  ordersData: TOrder[];
  isLoading: boolean;
  err: SerializedError | null;
};

export const userOrderInitial: userOrdersSliceState = {
  ordersData: [],
  isLoading: false,
  err: null
};

export const userOrdersSlice = createSlice({
  name: REDUX_SLICES.userOrders,
  initialState: userOrderInitial,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserOrdersThunk.pending, userOrderExtraReducers.pending);
    builder.addCase(
      getUserOrdersThunk.fulfilled,
      userOrderExtraReducers.fulfilled
    );
    builder.addCase(
      getUserOrdersThunk.rejected,
      userOrderExtraReducers.rejected
    );
    builder.addCase(getOrderByNumberThunk.pending, orderHandlers.pending);
    builder.addCase(getOrderByNumberThunk.fulfilled, orderHandlers.fulfilled);
    builder.addCase(getOrderByNumberThunk.rejected, orderHandlers.rejected);
  },
  selectors: {
    selectUserOrders: (state) => state.ordersData,
    selectIsLoading: (state) => state.isLoading,
    selectErr: (state) => state.err
  }
});

export const { selectUserOrders, selectErr, selectIsLoading } =
  userOrdersSlice.selectors;

export default userOrdersSlice;
