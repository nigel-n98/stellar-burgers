import { orderBurgerApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const orderBurgerThunk = createAsyncThunk(
  'order/create',
  orderBurgerApi
);
