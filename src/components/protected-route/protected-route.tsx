import { useLocation, Navigate } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { Preloader } from '../ui/preloader';
import {
  selectAuthVerified,
  selectCurrentUser
} from '../../services/slices/userSlice';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children
}: ProtectedRouteProps) => {
  const authReady = useSelector(selectAuthVerified);
  const currentUser = useSelector(selectCurrentUser);
  const location = useLocation();

  const isLoading = !authReady;
  const needLogin = !onlyUnAuth && !currentUser;
  const needHome = onlyUnAuth && !!currentUser;

  const loginRedirect = (
    <Navigate replace to='/login' state={{ from: location }} />
  );
  const homeRedirect = (
    <Navigate replace to={(location.state as any)?.from ?? { pathname: '/' }} />
  );

  const content = isLoading ? (
    <Preloader />
  ) : needLogin ? (
    loginRedirect
  ) : needHome ? (
    homeRedirect
  ) : (
    children
  );

  return content;
};
