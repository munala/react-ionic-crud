import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import AppContext from '../context/state';
import { AppStateInterface } from '../typescript/interfaces';

export default (props: { path: string; exact?: boolean; Component: React.FC }) => (
  <AppContext.Consumer>
    {(state: AppStateInterface) => {
      const { path, exact, Component } = props;
      const {
        auth: { loggedIn },
      } = state;
      return (
        <Route
          path={path}
          render={(props: any) => (loggedIn ? <Component {...props} /> : <Redirect to="/auth" />)}
          exact={exact}
        />
      );
    }}
  </AppContext.Consumer>
);
