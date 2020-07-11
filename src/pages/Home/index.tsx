import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonRouterOutlet, IonTabs } from '@ionic/react';
import ProtectedRoute from '../../wrappers/ProtectedRoute';
import Colors from '../../pages/Colors';
import Color from '../../pages/Color';
import Users from '../../pages/Users';
import User from '../../pages/User';
import TabBar from '../../components/TabBar';

export default () => (
  <IonRouterOutlet>
    <IonTabs>
      <ProtectedRoute path="/colors" Component={Colors} exact />
      <ProtectedRoute path="/colors/:id" Component={Color} />
      <ProtectedRoute path="/users" Component={Users} exact />
      <ProtectedRoute path="/users/:id" Component={User} />
      <ProtectedRoute path="/users/me" Component={User} exact />
      <Route path="/" render={() => <Redirect to="/colors" />} exact />
      <TabBar />
    </IonTabs>
  </IonRouterOutlet>
);
