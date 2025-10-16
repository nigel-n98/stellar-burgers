import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { selectCurrentUser } from '../../services/slices/userSlice';

export const AppHeader: FC = () => {
  const user = useSelector(selectCurrentUser);
  const userName = user?.name;

  return <AppHeaderUI userName={userName} />;
};
