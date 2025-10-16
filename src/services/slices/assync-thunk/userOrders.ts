import { getOrdersApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getUserOrdersThunk = createAsyncThunk(
  'userOrders/fetchAll',
  getOrdersApi
);
