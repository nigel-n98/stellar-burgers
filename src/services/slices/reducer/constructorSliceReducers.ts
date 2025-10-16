import { PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { nanoid } from 'nanoid';
import { BurgerSliceState } from '../constructorSlice';

export const burgerReducers = {
  insertItem: {
    reducer: (
      state: BurgerSliceState,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      const ingredient = action.payload;
      if (ingredient.type === 'bun') {
        state.builderItems.bun = ingredient;
      } else {
        state.builderItems.fillings = [
          ...state.builderItems.fillings,
          ingredient
        ];
      }
    },
    prepare: (source: TIngredient) => ({
      payload: Object.assign({}, source, { id: nanoid() })
    })
  },

  removeItem: (
    state: BurgerSliceState,
    action: PayloadAction<TConstructorIngredient>
  ) => {
    state.builderItems.fillings = state.builderItems.fillings.filter(
      (el) => el.id !== action.payload.id
    );
  },

  reorderItem: (
    state: BurgerSliceState,
    action: PayloadAction<{ index: number; direction: 'up' | 'down' }>
  ) => {
    const { index, direction } = action.payload;
    const fillings = state.builderItems.fillings;

    if (direction === 'up' && index > 0) {
      const temp = fillings[index];
      fillings[index] = fillings[index - 1];
      fillings[index - 1] = temp;
    } else if (direction === 'down' && index < fillings.length - 1) {
      const temp = fillings[index];
      fillings[index] = fillings[index + 1];
      fillings[index + 1] = temp;
    }
  },

  clearOrderPopup: (state: BurgerSliceState) => {
    state.orderPopupData = null;
  }
};
