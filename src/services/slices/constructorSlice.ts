import {
  PayloadAction,
  SerializedError,
  createSlice,
  nanoid
} from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { SLICE_NAMES } from '../../utils/constants';
import { fetchOrderBurger } from './assync-thunk/burger-constructor';

interface BurgerState {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  error: SerializedError | null;
  orderRequest: boolean;
  orderModalData: TOrder | null;
}

export const initialState: BurgerState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  error: null,
  orderRequest: false,
  orderModalData: null
};

export const constructorSlice = createSlice({
  name: SLICE_NAMES.burgerConstructor,
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        action.payload.type === 'bun'
          ? (state.constructorItems.bun = action.payload)
          : state.constructorItems.ingredients.push(action.payload);
      },
      prepare: (ingridient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingridient, id: id } };
      }
    },
    deleteIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (i) => i.id !== action.payload.id
        );
    },
    moveUpIngredient: (state, action: PayloadAction<number>) => {
      if (action.payload !== 0) {
        state.constructorItems.ingredients[action.payload] =
          state.constructorItems.ingredients.splice(
            action.payload - 1,
            1,
            state.constructorItems.ingredients[action.payload]
          )[0];
      }
    },
    moveDownIngredient: (state, action: PayloadAction<number>) => {
      if (action.payload !== state.constructorItems.ingredients.length - 1) {
        state.constructorItems.ingredients[action.payload] =
          state.constructorItems.ingredients.splice(
            action.payload + 1,
            1,
            state.constructorItems.ingredients[action.payload]
          )[0];
      }
    },
    resetOrderModal: (state) => {
      state.orderModalData = null;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOrderBurger.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(fetchOrderBurger.rejected, (state, action) => {
        state.error = action.error;
        state.orderRequest = false;
      })
      .addCase(fetchOrderBurger.fulfilled, (state, action) => {
        state.constructorItems.bun = null;
        state.constructorItems.ingredients = [];
        state.error = null;
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      });
  },
  selectors: {
    getConstructorItems: (state) => state.constructorItems,
    getOrderError: (state) => state.error,
    getOrderRequest: (state) => state.orderRequest,
    getModalData: (state) => state.orderModalData
  }
});

export const {
  addIngredient,
  deleteIngredient,
  moveUpIngredient,
  moveDownIngredient,
  resetOrderModal
} = constructorSlice.actions;

export const {
  getConstructorItems,
  getOrderError,
  getOrderRequest,
  getModalData
} = constructorSlice.selectors;
export default constructorSlice;
