import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import AppContext from '../context/state';

export default (props: { path: string; exact?: boolean; Component: React.FC }) => {
  const { path, exact = false, Component } = props;

  const {
    auth: { loggedIn },
  } = useContext(AppContext);

  return (
    <Route
      path={path}
      render={(props: any) => (loggedIn ? <Component {...props} /> : <Redirect to="/auth" />)}
      exact={exact}
    />
  );
};
