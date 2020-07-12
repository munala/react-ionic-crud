import React, { useContext, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonBackButton,
  IonButtons,
} from '@ionic/react';
import { useParams } from 'react-router-dom';
import LoadingIndicator from '../../components/LoadingIndicator';
import { getColor } from '../../api/colorApi';

import AppContext from '../../context/state';

import './styles.css';

const Color: React.FC = () => {
  const {
    color,
    loading: { color: loading },
    error: { color: error },
    dispatch,
  } = useContext(AppContext);

  const { id } = useParams();

  useEffect(() => {
    getColor({ id, dispatch });
  }, []);

  if (loading) return <LoadingIndicator />;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="colors" />
          </IonButtons>
          <IonTitle>{color.name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {error && (
          <IonItem>
            <IonLabel color="danger">{error}</IonLabel>
          </IonItem>
        )}

        <IonItem>
          <IonLabel color="primary">Name</IonLabel>
          <IonLabel color="secondary">{color.name}</IonLabel>
        </IonItem>

        <IonItem>
          <IonLabel color="primary">Hex Value</IonLabel>
          <IonLabel color="secondary">{color.color}</IonLabel>
        </IonItem>

        <IonItem>
          <IonLabel color="primary">Year</IonLabel>
          <IonLabel color="secondary">{color.year}</IonLabel>
        </IonItem>

        {color.pantone_value && (
          <IonItem>
            <IonLabel color="primary">Pantone Value</IonLabel>
            <IonLabel color="secondary">{color.pantone_value}</IonLabel>
          </IonItem>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Color;
