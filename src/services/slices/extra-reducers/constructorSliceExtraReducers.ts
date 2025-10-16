import { BurgerSliceState } from '../constructorSlice';
import { SerializedError } from '@reduxjs/toolkit';

export const burgerSliceExtraReducer = {
  pending: (state: BurgerSliceState) => {
    state.isOrdering = true;
    state.err = null;
  },
  rejected: (state: BurgerSliceState, action: { error: SerializedError }) => {
    state.err = action.error;
    state.isOrdering = false;
  },
  fulfilled: (
    state: BurgerSliceState,
    action: { payload: { order: BurgerSliceState['orderPopupData'] } }
  ) => {
    state.builderItems.bun = null;
    state.builderItems.fillings = [];
    state.err = null;
    state.isOrdering = false;
    state.orderPopupData = action.payload.order;
  }
};
