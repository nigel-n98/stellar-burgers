import rootReducer from '../index';

describe('rootReducer', () => {
  it('должен правильно инициализироваться с начальными состояниями всех слайсов', () => {
    const state = rootReducer(undefined, { type: '@@INIT' });
    
    expect(state).toHaveProperty('userSlice');
    expect(state).toHaveProperty('ingredientsSlice');  
    expect(state).toHaveProperty('feedSlice');
    expect(state).toHaveProperty('constructorSlice');
    expect(state).toHaveProperty('userOrdersSlice');
    
    expect(state.userSlice).toEqual(expect.any(Object));
    expect(state.ingredientsSlice).toEqual(expect.any(Object));
    expect(state.feedSlice).toEqual(expect.any(Object));
    expect(state.constructorSlice).toEqual(expect.any(Object));
    expect(state.userOrdersSlice).toEqual(expect.any(Object));
  });

  it('должен возвращать тот же state при неизвестном action', () => {
    const initialState = rootReducer(undefined, { type: '@@INIT' });
    const nextState = rootReducer(initialState, { type: 'UNKNOWN_ACTION' });
    
    expect(nextState).toBe(initialState);
  });
});