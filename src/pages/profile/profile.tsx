import { ProfileUI } from '@ui-pages';
import {
  FC,
  SyntheticEvent,
  useEffect,
  useState,
  useMemo,
  useCallback
} from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { selectCurrentUser } from '../../services/slices/userSlice';
import { updateUserThunk } from '../../services/slices/assync-thunk/user';

export const Profile: FC = () => {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    if (user) {
      const { name, email } = user;
      setProfileData((data) => ({
        ...data,
        name: name ?? '',
        email: email ?? ''
      }));
    }
  }, [user]);

  const isFormChanged = useMemo(
    () =>
      profileData.name !== (user?.name ?? '') ||
      profileData.email !== (user?.email ?? '') ||
      Boolean(profileData.password),
    [profileData, user]
  );

  const handleSubmit = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      dispatch(updateUserThunk({ ...profileData }));
    },
    [dispatch, profileData]
  );

  const handleCancel = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      setProfileData({
        name: user?.name ?? '',
        email: user?.email ?? '',
        password: ''
      });
    },
    [user]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <ProfileUI
      formValue={profileData}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
