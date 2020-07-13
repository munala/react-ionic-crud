import React, { useState } from 'react';
import {
  IonContent,
  IonModal,
  IonInput,
  IonItem,
  IonButton,
  IonItemDivider,
  IonLabel,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonFab,
  IonFabButton,
  IonIcon,
} from '@ionic/react';
import { add } from 'ionicons/icons';

import LoadingIndicator from '../LoadingIndicator';

const emptyErrors = { email: '', firstName: '', lastName: '' };

const NewUserInput = (props: { onSubmit: Function }) => {
  const { onSubmit } = props;
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [errors, setErrors] = useState(emptyErrors);

  const validateForm = () => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const validEmail = re.test(String(email).toLowerCase());

    if (!validEmail) setErrors({ ...errors, email: 'Invalid email' });

    const validFirstName = firstName.length >= 1;

    if (!validFirstName) setErrors({ ...errors, firstName: 'At least one character required' });

    const validLastName = lastName.length >= 1;

    if (!validLastName) setErrors({ ...errors, firstName: 'At least one character required' });

    return validEmail && validFirstName && validLastName;
  };

  const handleSubmit = async () => {
    const formIsValid = validateForm();

    if (formIsValid) {
      setLoading(true);

      await onSubmit({
        email,
        first_name: firstName,
        last_name: lastName,
      });

      setLoading(false);
      setShowModal(false);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setEmail('');
    setFirstName('');
    setLastName('');
  };

  if (showModal) {
    return (
      <IonModal isOpen={showModal}>
        {loading ? (
          <LoadingIndicator />
        ) : (
          <IonContent>
            <IonHeader>
              <IonToolbar>
                <IonTitle>Add a New User</IonTitle>
              </IonToolbar>
            </IonHeader>

            <IonItemDivider>First Name</IonItemDivider>
            <IonItem>
              <IonInput
                name="first_name"
                value={firstName}
                placeholder="Enter first name"
                onIonChange={(e) => setFirstName(e.detail.value!)}
                clearInput
                required
              />
            </IonItem>

            {errors.firstName && (
              <IonItem>
                <IonLabel color="danger">{errors.firstName}</IonLabel>
              </IonItem>
            )}

            <IonItemDivider>Last Name</IonItemDivider>
            <IonItem>
              <IonInput
                name="lastName"
                value={lastName}
                placeholder="Enter last name"
                onIonChange={(e) => setLastName(e.detail.value!)}
                clearInput
                required
              />
            </IonItem>

            {errors.lastName && (
              <IonItem>
                <IonLabel color="danger">{errors.lastName}</IonLabel>
              </IonItem>
            )}

            <IonItemDivider>Email</IonItemDivider>
            <IonItem>
              <IonInput
                name="email"
                value={email}
                type="email"
                placeholder="Enter email"
                onIonChange={(e) => setEmail(e.detail.value!)}
                clearInput
                required
              />
            </IonItem>

            {errors.email && (
              <IonItem>
                <IonLabel color="danger">{errors.email}</IonLabel>
              </IonItem>
            )}

            <IonButton
              disabled={!email || !firstName || !lastName}
              onClick={handleSubmit}
              color="primary"
            >
              Save
            </IonButton>

            <IonButton onClick={handleClose} color="light">
              Cancel
            </IonButton>
          </IonContent>
        )}
      </IonModal>
    );
  }

  return (
    <IonFab vertical="bottom" horizontal="end" slot="fixed">
      <IonFabButton onClick={() => setShowModal(true)}>
        <IonIcon icon={add} />
      </IonFabButton>
    </IonFab>
  );
};

export default NewUserInput;
