import React, { useContext, useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonRouterOutlet,
  IonTabs,
  IonApp,
  IonIcon,
  IonLabel,
  IonTabBar,
  IonTabButton,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { person, people, albums } from 'ionicons/icons';
import { Plugins } from '@capacitor/core';

import ProtectedRoute from '../wrappers/ProtectedRoute';
import Colors from '../pages/Colors';
import Color from '../pages/Color';
import Users from '../pages/Users';
import User from '../pages/User';
import Auth from '../pages/Auth';
import LoadingIndicator from '../components/LoadingIndicator';
import AppContext from '../context/state';
import { LOGIN } from '../context/actionTypes';

const { Storage } = Plugins;

const Routes: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const {
    auth: { loggedIn },
    dispatch,
  } = useContext(AppContext);

  // useEffect(() => {
  //   Storage.get({
  //     key: 'token',
  //   }).then((result: { value: string | null }) => {
  //     setLoading(false);
  //     if (result.value) {
  //       dispatch({
  //         type: LOGIN,
  //         payload: { token: result.value },
  //       });
  //     }
  //   });
  // });

  if (loading) return <LoadingIndicator />;

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/auth" component={Auth} exact />
            <ProtectedRoute path="/colors" Component={Colors} exact />
            <ProtectedRoute path="/colors/:id" Component={Color} />
            <ProtectedRoute path="/users" Component={Users} exact />
            <ProtectedRoute path="/users/:id" Component={User} />
            <ProtectedRoute path="/profile" Component={User} exact />
            <Route path="/" render={() => <Redirect to="/colors" />} exact />
          </IonRouterOutlet>

          <IonTabBar slot="bottom" style={loggedIn ? {} : { display: 'none' }}>
            <IonTabButton tab="colors" href="/colors">
              <IonIcon icon={albums} />
              <IonLabel>Colors</IonLabel>
            </IonTabButton>
            <IonTabButton tab="users" href="/users">
              <IonIcon icon={people} />
              <IonLabel>Users</IonLabel>
            </IonTabButton>
            <IonTabButton tab="profile" href="/profile">
              <IonIcon icon={person} />
              <IonLabel>Profile</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default Routes;
