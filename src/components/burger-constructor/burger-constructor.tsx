import { FC, useMemo } from 'react';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import {
  getConstructorItems,
  getModalData,
  getOrderRequest,
  resetOrderModal
} from '../../services/slices/constructorSlice';
import { getUser } from '../../services/slices/userSlice';
import { fetchOrderBurger } from '../../services/slices/assync-thunk/burger-constructor';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const constructorIngredient = useSelector(getConstructorItems);
  const user = useSelector(getUser);
  const bun = constructorIngredient?.bun ?? null;
  const ingredients = constructorIngredient?.ingredients ?? [];

  const orderData = ingredients
    .map((i) => i._id)
    .concat([bun?._id || ''], [bun?._id || ''])
    .filter((i) => i !== '');

  const constructorItems = {
    bun: bun,
    ingredients: ingredients
  };

  const orderRequest = useSelector(getOrderRequest);

  const orderModalData = useSelector(getModalData);

  const onOrderClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!constructorItems.bun || orderRequest) return;

    dispatch(fetchOrderBurger(orderData));
  };

  const closeOrderModal = () => {
    dispatch(resetOrderModal());
    navigate('/');
  };

  let ingredientPrice = 0;
  constructorItems.ingredients.forEach((i) => (ingredientPrice += i.price));

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      ingredientPrice,
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
