import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import AppContext from '../../context/state';
import AuthInput from '../../components/AuthInput';
import { login, register } from '../../api/authApi';
import LoadingIndicator from '../../components/LoadingIndicator';
import './styles.css';

const Auth: React.FC = () => {
  const [title, setTitle] = useState('login');

  const {
    dispatch,
    auth: { loggedIn },
    loading: { auth: loading },
  } = useContext(AppContext);

  const switchMode = () => setTitle(title === 'login' ? 'register' : 'login');
  const authAction = title === 'login' ? login : register;

  const submit = (user: { email: string; password: string }) => {
    authAction({ user, dispatch });
  };

  if (loggedIn) {
    return <Redirect to="/colors" />;
  }

  if (loading) return <LoadingIndicator />;

  return <AuthInput title={title} onSwitchMode={switchMode} onSubmit={submit} />;
};

export default Auth;
