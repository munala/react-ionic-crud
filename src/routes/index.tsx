import React, { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
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
import { people, albums } from 'ionicons/icons';

import ProtectedRoute from '../wrappers/ProtectedRoute';
import Colors from '../pages/Colors';
import Color from '../pages/Color';
import Users from '../pages/Users';
import User from '../pages/User';
import Auth from '../pages/Auth';
import AppContext from '../context/state';

const Routes: React.FC = () => {
  const {
    auth: { loggedIn },
  } = useContext(AppContext);

  return (
    <IonApp>
      <IonReactRouter>
        <Switch>
          <Route path="/auth" component={Auth} exact />

          <IonTabs>
            <IonRouterOutlet>
              <ProtectedRoute path="/colors" Component={Colors} exact />
              <ProtectedRoute path="/colors/:id" Component={Color} exact />
              <ProtectedRoute path="/users" Component={Users} exact />
              <ProtectedRoute path="/users/:id" Component={User} exact />
              <Route path="/" render={() => <Redirect to="/colors" />} exact />
            </IonRouterOutlet>

            <IonTabBar slot="bottom" className={loggedIn ? '' : 'hidden-tabs'}>
              <IonTabButton tab="colors" href="/colors">
                <IonIcon icon={albums} />
                <IonLabel>Colors</IonLabel>
              </IonTabButton>
              <IonTabButton tab="users" href="/users">
                <IonIcon icon={people} />
                <IonLabel>Users</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </Switch>
      </IonReactRouter>
    </IonApp>
  );
};

export default Routes;
