import { combineReducers } from '@reduxjs/toolkit';

import constructorSlice from './constructorSlice';
import feedSlice from './feedSlice';
import ingredientSlice from './ingredientsSlice';
import userOrdersSlice from './userOrderSlice';
import userSlice from './userSlice';

const rootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
  [ingredientSlice.name]: ingredientSlice.reducer,
  [feedSlice.name]: feedSlice.reducer,
  [constructorSlice.name]: constructorSlice.reducer,
  [userOrdersSlice.name]: userOrdersSlice.reducer
});

export default rootReducer;
