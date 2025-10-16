import { createAsyncThunk } from '@reduxjs/toolkit';
import { getOrderByNumberApi } from '@api';
import { TOrder } from '@utils-types';

export const getOrderByNumberThunk = createAsyncThunk<TOrder, number>(
  'orders/fetchByNumber',
  async (orderNumber, { rejectWithValue }) => {
    try {
      const data = await getOrderByNumberApi(orderNumber);
      if (data.success && data.orders.length) {
        return data.orders[0];
      } else {
        return rejectWithValue('Order not found');
      }
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
