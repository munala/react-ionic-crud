import React from 'react';
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
import ProtectedRoute from '../wrappers/ProtectedRoute';
import Colors from '../pages/Colors';
import Color from '../pages/Color';
import Users from '../pages/Users';
import User from '../pages/User';
import Auth from '../pages/Auth';
import AppContext from '../context/state';
import { AppStateInterface } from '../typescript/interfaces';

const Routes: React.FC = () => (
  <AppContext.Consumer>
    {(state: AppStateInterface) => (
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

            <IonTabBar slot="bottom" style={state.auth.loggedIn ? {} : { display: 'none' }}>
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
    )}
  </AppContext.Consumer>
);

export default Routes;