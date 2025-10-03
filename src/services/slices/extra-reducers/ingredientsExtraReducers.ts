import { PayloadAction, SerializedError } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { IngredientsSliceState } from '../ingredientsSlice';

export const ingredientsExtraReducers = {
  pending: (state: IngredientsSliceState) => {
    state.isLoading = true;
    state.err = null;
  },
  fulfilled: (
    state: IngredientsSliceState,
    action: PayloadAction<TIngredient[]>
  ) => {
    state.items = action.payload;
    state.isLoading = false;
    state.err = null;
  },
  rejected: (
    state: IngredientsSliceState,
    action: { error: SerializedError }
  ) => {
    state.isLoading = false;
    state.err = action.error;
  }
};
