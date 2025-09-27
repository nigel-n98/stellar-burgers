// import { FC } from 'react';
// import { useLocation } from 'react-router-dom';
// import { ProfileMenuUI } from '@ui';

// export const ProfileMenu: FC = () => {
//   const { pathname } = useLocation();

//   const handleLogout = () => {};

//   return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
// };

////////////////

import { FC, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from '../../services/store';
import { fetchUserLogout } from '../../services/slices/assync-thunk/user';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = useCallback(async () => {
    await dispatch(fetchUserLogout());
    navigate('/login');
  }, [dispatch, navigate]);

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
