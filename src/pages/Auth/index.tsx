import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import AppContext from '../../context/state';
import AuthInput from '../../components/AuthInput';
import { AppStateInterface } from '../../typescript/interfaces';
import { login, register } from '../../api/authApi';
import './styles.css';

const Auth: React.FC = () => {
  const [title, setTitle] = useState('login');

  const switchMode = () => setTitle(title === 'login' ? 'register' : 'login');
  const authAction = title === 'login' ? login : register;

  return (
    <AppContext.Consumer>
      {(state: AppStateInterface) => {
        const {
          dispatch,
          auth: { loggedIn },
        } = state;

        if (loggedIn) {
          return <Redirect to="/colors" />;
        }

        const submit = (user: { email: string; password: string }) => {
          authAction({ user, dispatch });
        };

        return <AuthInput title={title} onSwitchMode={switchMode} onSubmit={submit} />;
      }}
    </AppContext.Consumer>
  );
};

export default Auth;
