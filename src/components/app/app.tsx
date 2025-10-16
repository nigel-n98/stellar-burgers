import { AppHeader, Modal } from '@components';
import { NotFound404 } from '@pages';
import { useEffect, useCallback } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { getIngredientsThunk } from '../../services/slices/assync-thunk/ingredients';
import '../../index.css';
import { useDispatch } from '../../services/store';
import { ProtectedRoute } from '../protected-route';
import styles from './app.module.css';
import { authCheckThunk } from '../../services/slices/assync-thunk/user';
import { PATHS } from './PATHS';
import { routes, modalRoutes } from './routesConfig';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const background = location.state?.background;

  const initializeApp = useCallback(() => {
    dispatch(authCheckThunk());
    dispatch(getIngredientsThunk());
  }, [dispatch]);

  useEffect(() => {
    initializeApp();
  }, [initializeApp]);

  const handleModalClose = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
      {background && (
        <Routes>
          {modalRoutes.map(({ path, element, protected: isProtected }) => (
            <Route
              key={path}
              path={path}
              element={
                isProtected ? (
                  <ProtectedRoute>
                    <Modal onClose={handleModalClose} title={element.title}>
                      <element.component />
                    </Modal>
                  </ProtectedRoute>
                ) : (
                  <Modal onClose={handleModalClose} title={element.title}>
                    <element.component />
                  </Modal>
                )
              }
            />
          ))}
          <Route path={PATHS.NOT_FOUND} element={<NotFound404 />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
