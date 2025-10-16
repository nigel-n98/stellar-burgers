import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useSelector, useDispatch } from '../../services/store';
import { useParams } from 'react-router-dom';
import { selectOrdersList } from '../../services/slices/feedSlice';
import { selectIngredients } from '../../services/slices/ingredientsSlice';
import { selectLoggedIn } from '../../services/slices/userSlice';
import { selectUserOrders } from '../../services/slices/userOrderSlice';
import { getOrderByNumberThunk } from '../../services/slices/assync-thunk/orderByNumber';

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();
  const ingredients = useSelector(selectIngredients);
  const isAuth = useSelector(selectLoggedIn);
  const orders = useSelector(selectOrdersList);
  const userOrders = useSelector(selectUserOrders);
  const dispatch = useDispatch();

  const orderData = useMemo(() => {
    const combinedOrders = isAuth ? [...orders, ...userOrders] : orders;
    return combinedOrders.find((order) => order.number === Number(number));
  }, [orders, userOrders, isAuth, number]);

  useEffect(() => {
    if (!orderData && number) {
      dispatch(getOrderByNumberThunk(Number(number)));
    }
  }, [orderData, number, dispatch]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = { ...ingredient, count: 1 };
          }
        } else {
          acc[item].count++;
        }
        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return { ...orderData, ingredientsInfo, date, total };
  }, [orderData, ingredients]);

  if (!orderInfo) return <Preloader />;

  return <OrderInfoUI orderInfo={orderInfo} />;
};
