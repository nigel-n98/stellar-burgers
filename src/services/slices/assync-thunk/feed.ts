import { getFeedsApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchFeed = createAsyncThunk('feed/fetchFeed', getFeedsApi);
