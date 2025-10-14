import { expect, test, describe } from '@jest/globals';
import { ingredientsSlice, ingredientInitial } from '../ingredientsSlice';
import { getIngredientsThunk } from '../assync-thunk/ingredients';
import { TIngredient } from '@utils-types';

const { reducer } = ingredientsSlice;

describe('ingredientsSlice', () => {
  test('должен вернуть initial state по умолчанию', () => {
    const state = reducer(undefined, { type: '' });
    expect(state).toEqual(ingredientInitial);
  });

  test('pending должен устанавливать isLoading = true и err = null', () => {
    const state = reducer(ingredientInitial, getIngredientsThunk.pending('', undefined));
    expect(state.isLoading).toBe(true);
    expect(state.err).toBeNull();
  });

  test('fulfilled должен записывать данные ингредиентов и выключать isLoading', () => {
    const payload: TIngredient[] = [
      {
        _id: '1',
        name: 'Булка',
        type: 'bun',
        proteins: 10,
        fat: 20,
        carbohydrates: 30,
        calories: 100,
        price: 50,
        image: 'img',
        image_large: 'img_large',
        image_mobile: 'img_mobile'
      }
    ];

    const state = reducer(ingredientInitial, getIngredientsThunk.fulfilled(payload, '', undefined));
    expect(state.items).toEqual(payload);
    expect(state.isLoading).toBe(false);
    expect(state.err).toBeNull();
  });

  test('rejected должен устанавливать ошибку и выключать isLoading', () => {
    const error = { message: 'Ошибка' } as any;
    const state = reducer(ingredientInitial, getIngredientsThunk.rejected(error, '', undefined));
    expect(state.isLoading).toBe(false);
    expect(state.err).toEqual(error);
  });
});
