import { SerializedError, createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient, TOrder } from '@utils-types';
import { REDUX_SLICES } from '../../utils/constants';
import { orderBurgerThunk } from './assync-thunk/burger-constructor';
import { burgerReducers } from './reducer/constructorSliceReducers';
import { burgerSliceExtraReducer } from './extra-reducers/constructorSliceExtraReducers';

export type BurgerSliceState = {
  builderItems: {
    bun: TConstructorIngredient | null;
    fillings: TConstructorIngredient[];
  };
  err: SerializedError | null;
  isOrdering: boolean;
  orderPopupData: TOrder | null;
};

export const defaultState: BurgerSliceState = {
  builderItems: {
    bun: null,
    fillings: []
  },
  err: null,
  isOrdering: false,
  orderPopupData: null
};

export const burgerBuilderSlice = createSlice({
  name: REDUX_SLICES.burgerConstructor,
  initialState: defaultState,
  reducers: burgerReducers,
  extraReducers(builder) {
    builder.addCase(orderBurgerThunk.pending, burgerSliceExtraReducer.pending);
    builder.addCase(
      orderBurgerThunk.rejected,
      burgerSliceExtraReducer.rejected
    );
    builder.addCase(
      orderBurgerThunk.fulfilled,
      burgerSliceExtraReducer.fulfilled
    );
  },
  selectors: {
    selectBuilderItems: (state) => state.builderItems,
    selectOrderErr: (state) => state.err,
    selectIsOrdering: (state) => state.isOrdering,
    selectPopupInfo: (state) => state.orderPopupData
  }
});

export const { insertItem, removeItem, reorderItem, clearOrderPopup } =
  burgerBuilderSlice.actions;

export const {
  selectBuilderItems,
  selectOrderErr,
  selectIsOrdering,
  selectPopupInfo
} = burgerBuilderSlice.selectors;

export default burgerBuilderSlice;
