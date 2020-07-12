import React from 'react';
import { IonLoading, IonContent } from '@ionic/react';

export default (props: { noText?: boolean | undefined }) => (
  <IonContent>
    <IonLoading isOpen message={props.noText ? '' : 'Please wait...'} />
  </IonContent>
);
