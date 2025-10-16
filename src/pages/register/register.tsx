import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { selectErr } from '../../services/slices/userSlice';
import {
  loginUserThunk,
  registerUserThunk
} from '../../services/slices/assync-thunk/user';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const err = useSelector(selectErr);
  const dispatch = useDispatch();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await dispatch(registerUserThunk({ name: userName, email, password }));
    await dispatch(loginUserThunk({ email, password }));
  };

  return (
    <RegisterUI
      errorText={err?.message}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
