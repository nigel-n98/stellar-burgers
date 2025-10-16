import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { Preloader } from '@ui';
import {
  selectOrdersList,
  selectIsLoading
} from '../../services/slices/feedSlice';
import { getFeedThunk } from '../../services/slices/assync-thunk/feed';
import { FeedUI } from '../../components/ui/pages/feed';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector(selectIsLoading);
  const orders: TOrder[] = useSelector(selectOrdersList);

  useEffect(() => {
    dispatch(getFeedThunk());
  }, [dispatch]);

  const handleGetFeeds = () => {
    dispatch(getFeedThunk());
  };

  if (isLoading) {
    return <Preloader />;
  }

  if (!orders || orders.length === 0) {
    return <div>Нет заказов для отображения</div>;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
