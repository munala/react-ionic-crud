import React from 'react';
import { IonItem, IonLabel, IonInput } from '@ionic/react';

export default (props: {
  editMode: boolean;
  label: string;
  value?: string;
  name: string;
  placeholder?: string;
  onChange: Function;
}) => {
  const {
    editMode = false, label, value, onChange,
  } = props;
  return (
    <IonItem>
      <IonLabel color="primary">{label}</IonLabel>
      {editMode ? (
        <IonInput
          name="first_name"
          value={value}
          placeholder="Enter First Name"
          onIonChange={(e) => onChange(e.detail.value!)}
          required
        />
      ) : (
        <IonLabel color="secondary">{value}</IonLabel>
      )}
    </IonItem>
  );
};
