import React from 'react';
import {
  IonIcon, IonLabel, IonTabBar, IonTabButton,
} from '@ionic/react';

import { ellipse, square, triangle } from 'ionicons/icons';

export default () => (
  <IonTabBar slot="bottom">
    <IonTabButton tab="colors" href="/colors">
      <IonIcon icon={triangle} />
      <IonLabel>Colors</IonLabel>
    </IonTabButton>
    <IonTabButton tab="users" href="/users">
      <IonIcon icon={ellipse} />
      <IonLabel>Users</IonLabel>
    </IonTabButton>
    <IonTabButton tab="user" href="/users/me">
      <IonIcon icon={square} />
      <IonLabel>Profile</IonLabel>
    </IonTabButton>
  </IonTabBar>
);
