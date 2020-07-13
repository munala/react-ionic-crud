import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import AppContext from '../../context/state';
import AuthInput from '../../components/AuthInput';
import { login, register } from '../../api/authApi';
import LoadingIndicator from '../../components/LoadingIndicator';

const Auth: React.FC = () => {
  const [title, setTitle] = useState('login');

  const {
    dispatch,
    auth: { loggedIn },
    loading: { auth: loading },
    error: { auth: error },
  } = useContext(AppContext);

  const history = useHistory();

  useEffect(() => {
    if (loggedIn) history.push('/colors');
  }, [loggedIn]);

  const switchMode = () => setTitle(title === 'login' ? 'register' : 'login');
  const authAction = title === 'login' ? login : register;

  const submit = (user: { email: string; password: string }) => {
    authAction({ user, dispatch });
  };

  if (loading) return <LoadingIndicator />;

  return <AuthInput title={title} onSwitchMode={switchMode} onSubmit={submit} error={error} />;
};

export default Auth;
