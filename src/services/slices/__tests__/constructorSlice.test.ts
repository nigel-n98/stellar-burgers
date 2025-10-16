jest.mock('nanoid');
import { burgerBuilderSlice, defaultState } from '../constructorSlice';
import {
  insertItem,
  removeItem,
  reorderItem,
  clearOrderPopup
} from '../constructorSlice';
import { orderBurgerThunk } from '../assync-thunk/burger-constructor';
import { BurgerSliceState } from '../constructorSlice';
import { TIngredient, TOrder } from '@utils-types';

const bun: TIngredient = {
  _id: '1',
  name: 'Булка N1',
  type: 'bun',
  proteins: 10,
  fat: 5,
  carbohydrates: 20,
  calories: 200,
  price: 50,
  image: 'bun.png',
  image_mobile: 'bun_m.png',
  image_large: 'bun_l.png'
};

const filling: TIngredient = {
  _id: '2',
  name: 'Начинка N1',
  type: 'main',
  proteins: 10,
  fat: 5,
  carbohydrates: 20,
  calories: 150,
  price: 100,
  image: 'filling.png',
  image_mobile: 'filling_m.png',
  image_large: 'filling_l.png'
};

describe('constructorSlice', () => {
  const reducer = burgerBuilderSlice.reducer;

  it('должен вернуть initial state по умолчанию', () => {
    expect(reducer(undefined, { type: '' })).toEqual(defaultState);
  });

  it('должен добавлять булку', () => {
    const nextState = reducer(defaultState, insertItem(bun));
    expect(nextState.builderItems.bun).not.toBeNull();
    expect(nextState.builderItems.bun?.type).toBe('bun');
  });

  it('должен добавлять начинку', () => {
    const nextState = reducer(defaultState, insertItem(filling));
    expect(nextState.builderItems.fillings.length).toBe(1);
    expect(nextState.builderItems.fillings[0].type).toBe('main');
  });

  it('должен удалять начинку по id', () => {
    const stateWithFillings: BurgerSliceState = {
      ...defaultState,
      builderItems: {
        bun: null,
        fillings: [
          { ...filling, id: 'abc' },
          { ...filling, id: 'xyz' }
        ]
      }
    };

    const nextState = reducer(
      stateWithFillings,
      removeItem({ ...filling, id: 'abc' })
    );

    expect(nextState.builderItems.fillings.length).toBe(1);
    expect(nextState.builderItems.fillings[0].id).toBe('xyz');
  });

  it('должен менять порядок начинки вверх', () => {
    const stateWithFillings: BurgerSliceState = {
      ...defaultState,
      builderItems: {
        bun: null,
        fillings: [
          { ...filling, id: '1' },
          { ...filling, id: '2' }
        ]
      }
    };

    const nextState = reducer(
      stateWithFillings,
      reorderItem({ index: 1, direction: 'up' })
    );

    expect(nextState.builderItems.fillings[0].id).toBe('2');
    expect(nextState.builderItems.fillings[1].id).toBe('1');
  });

  it('должен менять порядок начинки вниз', () => {
    const stateWithFillings: BurgerSliceState = {
      ...defaultState,
      builderItems: {
        bun: null,
        fillings: [
          { ...filling, id: '1' },
          { ...filling, id: '2' }
        ]
      }
    };

    const nextState = reducer(
      stateWithFillings,
      reorderItem({ index: 0, direction: 'down' })
    );

    expect(nextState.builderItems.fillings[0].id).toBe('2');
    expect(nextState.builderItems.fillings[1].id).toBe('1');
  });

  it('должен очищать данные заказа', () => {
    const stateWithOrder: BurgerSliceState = {
      ...defaultState,
      orderPopupData: {
        _id: '123',
        name: 'Burger',
        status: 'done',
        createdAt: '2025-10-12T00:00:00.000Z',
        updatedAt: '2025-10-12T00:00:00.000Z',
        number: 123,
        ingredients: []
      }
    };

    const nextState = reducer(stateWithOrder, clearOrderPopup());
    expect(nextState.orderPopupData).toBeNull();
  });

  describe('extra reducers', () => {
    it('pending должен устанавливать isOrdering = true и err = null', () => {
      const nextState = reducer(defaultState, orderBurgerThunk.pending('', []));
      expect(nextState.isOrdering).toBe(true);
      expect(nextState.err).toBeNull();
    });

    it('rejected должен записывать ошибку и isOrdering = false', () => {
      const error = { name: 'Error', message: 'Ошибка' };
      const nextState = reducer(
        defaultState,
        orderBurgerThunk.rejected(error, '', [])
      );
      expect(nextState.isOrdering).toBe(false);
      expect(nextState.err).toEqual(error);
    });

    it('fulfilled должен очищать конструктор и записывать orderPopupData', () => {
      const prevState: BurgerSliceState = {
        ...defaultState,
        builderItems: {
          bun: { ...bun, id: 'bun123' },
          fillings: [{ ...filling, id: 'fill1' }]
        },
        isOrdering: true,
        err: null,
        orderPopupData: null
      };

      const payload = {
        success: true,
        name: 'createOrder',
        order: {
          _id: 'order123',
          status: 'done',
          name: 'Super Burger',
          createdAt: '2025-10-12T00:00:00.000Z',
          updatedAt: '2025-10-12T00:00:00.000Z',
          number: 777,
          ingredients: ['1', '2']
        } as TOrder
      };

      const nextState = reducer(
        prevState,
        orderBurgerThunk.fulfilled(payload, '', [])
      );

      expect(nextState.isOrdering).toBe(false);
      expect(nextState.builderItems.bun).toBeNull();
      expect(nextState.builderItems.fillings.length).toBe(0);
      expect(nextState.orderPopupData).toEqual(payload.order);
    });
  });
});
