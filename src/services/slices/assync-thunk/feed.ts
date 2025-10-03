import { getFeedsApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getFeedThunk = createAsyncThunk('feed/fetch', getFeedsApi);
