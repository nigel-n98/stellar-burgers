import { createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { REDUX_SLICES } from '../../utils/constants';
import { getIngredientsThunk } from './assync-thunk/ingredients';
import { ingredientsExtraReducers } from './extra-reducers/ingredientsExtraReducers';

export type IngredientsSliceState = {
  items: TIngredient[];
  isLoading: boolean;
  err: SerializedError | null;
};

export const ingredientInitial: IngredientsSliceState = {
  items: [],
  isLoading: false,
  err: null
};

export const ingredientsSlice = createSlice({
  name: REDUX_SLICES.ingredients,
  initialState: ingredientInitial,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getIngredientsThunk.pending,
      ingredientsExtraReducers.pending
    );
    builder.addCase(
      getIngredientsThunk.fulfilled,
      ingredientsExtraReducers.fulfilled
    );
    builder.addCase(
      getIngredientsThunk.rejected,
      ingredientsExtraReducers.rejected
    );
  },
  selectors: {
    selectIngredients: (state) => state.items,
    selectIsLoading: (state) => state.isLoading,
    selectErr: (state) => state.err
  }
});

export const { selectIngredients, selectIsLoading, selectErr } =
  ingredientsSlice.selectors;

export default ingredientsSlice;
