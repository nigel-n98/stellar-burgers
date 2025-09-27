import { createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { SLICE_NAMES } from '../../utils/constants';
import { fetchIngredients } from './assync-thunk/ingredients';

interface IIngredientsState {
  ingredients: TIngredient[];
  loading: boolean;
  error: SerializedError | null;
}

export const initialState: IIngredientsState = {
  ingredients: [],
  loading: false,
  error: null
};

export const ingredientsSlice = createSlice({
  name: SLICE_NAMES.ingredients,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchIngredients.fulfilled,
        (state, action: PayloadAction<TIngredient[]>) => {
          state.ingredients = action.payload;
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
  selectors: {
    getIngredients: (state) => state.ingredients,
    isIngredientsLoading: (state) => state.loading,
    getIngredientError: (state) => state.error
  }
});

export const { getIngredients, isIngredientsLoading, getIngredientError } =
  ingredientsSlice.selectors;

export default ingredientsSlice;
