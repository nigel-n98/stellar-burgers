import { getOrdersApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUserOrders = createAsyncThunk('user/orders', getOrdersApi);
