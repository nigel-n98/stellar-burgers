import { IngredientDetails, Modal, OrderInfo } from '@components';
import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import { ProtectedRoute } from '../protected-route';
import { PATHS } from './PATHS';

export const routes = [
  { path: PATHS.HOME, element: <ConstructorPage /> },
  { path: PATHS.FEED, element: <Feed /> },
  {
    path: PATHS.LOGIN,
    element: (
      <ProtectedRoute onlyUnAuth>
        <Login />
      </ProtectedRoute>
    )
  },
  {
    path: PATHS.REGISTER,
    element: (
      <ProtectedRoute onlyUnAuth>
        <Register />
      </ProtectedRoute>
    )
  },
  {
    path: PATHS.FORGOT_PASSWORD,
    element: (
      <ProtectedRoute onlyUnAuth>
        <ForgotPassword />
      </ProtectedRoute>
    )
  },
  {
    path: PATHS.RESET_PASSWORD,
    element: (
      <ProtectedRoute onlyUnAuth>
        <ResetPassword />
      </ProtectedRoute>
    )
  },
  {
    path: PATHS.PROFILE,
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    )
  },
  {
    path: PATHS.PROFILE_ORDERS,
    element: (
      <ProtectedRoute>
        <ProfileOrders />
      </ProtectedRoute>
    )
  },
  { path: PATHS.FEED_DETAILS, element: <OrderInfo /> },
  { path: PATHS.INGREDIENT_DETAILS, element: <IngredientDetails /> },
  {
    path: PATHS.PROFILE_ORDER_DETAILS,
    element: (
      <ProtectedRoute>
        <OrderInfo />
      </ProtectedRoute>
    )
  },
  { path: PATHS.NOT_FOUND, element: <NotFound404 /> }
];

export const modalRoutes = [
  {
    path: PATHS.FEED_DETAILS,
    element: { component: OrderInfo, title: 'Детали заказа' }
  },
  {
    path: PATHS.INGREDIENT_DETAILS,
    element: { component: IngredientDetails, title: 'Пищевая ценность' }
  },
  {
    path: PATHS.PROFILE_ORDER_DETAILS,
    element: { component: OrderInfo, title: 'Детали заказа' },
    protected: true
  }
];
