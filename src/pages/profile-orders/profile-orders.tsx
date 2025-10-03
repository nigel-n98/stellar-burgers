import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { Preloader } from '@ui';
import {
  selectUserOrders,
  selectIsLoading
} from '../../services/slices/userOrderSlice';
import { getUserOrdersThunk } from '../../services/slices/assync-thunk/userOrders';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  const isloading = useSelector(selectIsLoading);
  const orders: TOrder[] = useSelector(selectUserOrders);

  useEffect(() => {
    dispatch(getUserOrdersThunk());
  }, []);

  const content = isloading ? (
    <Preloader />
  ) : (
    <ProfileOrdersUI orders={orders} />
  );

  return content;
};
