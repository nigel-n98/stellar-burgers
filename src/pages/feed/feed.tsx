import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getAllOrders } from '../../services/slices/feedSlice';
import { fetchFeed } from '../../services/slices/assync-thunk/feed';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(getAllOrders);

  useEffect(() => {
    dispatch(fetchFeed());
  }, []);

  const handleGetFeeds = () => {
    location.assign('/feed');
    dispatch(fetchFeed());
  };

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
