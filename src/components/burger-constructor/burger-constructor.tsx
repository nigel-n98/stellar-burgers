import { FC, useMemo } from 'react';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import {
  selectBuilderItems,
  selectPopupInfo,
  selectIsOrdering,
  clearOrderPopup
} from '../../services/slices/constructorSlice';
import { selectCurrentUser } from '../../services/slices/userSlice';
import { orderBurgerThunk } from '../../services/slices/assync-thunk/burger-constructor';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedItems = useSelector(selectBuilderItems);
  const user = useSelector(selectCurrentUser);
  const isProcessingOrder = useSelector(selectIsOrdering);
  const popupData = useSelector(selectPopupInfo);

  const bun = selectedItems?.bun || null;
  const fillings = selectedItems?.fillings || [];

  const orderData = useMemo(() => {
    const ingredientIds = fillings.map((item) => item._id);
    if (bun) {
      ingredientIds.push(bun._id, bun._id);
    }
    return ingredientIds;
  }, [bun, fillings]);

  const items = {
    bun,
    ingredients: fillings
  };

  const price = useMemo(() => {
    let total = bun ? bun.price * 2 : 0;
    total += fillings.reduce((sum, item) => sum + item.price, 0);
    return total;
  }, [bun, fillings]);

  const handleOrderSubmit = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!bun || isProcessingOrder) return;

    dispatch(orderBurgerThunk(orderData));
  };

  const handleModalClose = () => {
    dispatch(clearOrderPopup());
    navigate('/');
  };

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={isProcessingOrder}
      constructorItems={items}
      orderModalData={popupData}
      onOrderClick={handleOrderSubmit}
      closeOrderModal={handleModalClose}
    />
  );
};
