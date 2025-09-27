import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { Preloader } from '@ui';
import {
  getUserOrders,
  isUserOrdersLoading
} from '../../services/slices/userOrderSlice';
import { fetchUserOrders } from '../../services/slices/assync-thunk/userOrders';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  const loading = useSelector(isUserOrdersLoading);
  const orders: TOrder[] = useSelector(getUserOrders);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, []);

  if (loading) return <Preloader />;

  return <ProfileOrdersUI orders={orders} />;
};
