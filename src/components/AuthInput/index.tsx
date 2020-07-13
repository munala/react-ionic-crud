import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonItem,
  IonButton,
  IonList,
  IonItemDivider,
  IonLabel,
} from '@ionic/react';

const MINIMUM_CHARACTERS = 4;

const AuthForm = (props: {
  title: string;
  onSubmit: Function;
  onSwitchMode: Function;
  error: string | null | undefined;
}) => {
  const {
    title, onSubmit, onSwitchMode, error,
  } = props;
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState({ email: '', password: '' });

  const option = title === 'login' ? 'register' : 'login';

  const handleClick = () => {
    const formIsValid = validateForm();

    if (formIsValid) {
      onSubmit({
        email,
        password,
      });
    }
  };

  const validateForm = () => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const validEmail = re.test(String(email).toLowerCase());

    if (!validEmail) setErrors({ ...errors, email: 'Invalid email' });

    const validPassword = password.length >= MINIMUM_CHARACTERS;

    if (!validPassword) {
      setErrors({
        ...errors,
        password: `Minimum of ${MINIMUM_CHARACTERS} characters are required`,
      });
    }

    return validEmail && validPassword;
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{title.toUpperCase()}</IonTitle>
        </IonToolbar>
      </IonHeader>
      {error && (
        <IonItem>
          <IonLabel color="danger">{error}</IonLabel>
        </IonItem>
      )}
      <IonContent>
        <IonList>
          <IonItemDivider>Email</IonItemDivider>
          <IonItem>
            <IonInput
              name="email"
              value={email}
              type="email"
              placeholder="Enter Email"
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

          <IonItemDivider>Password</IonItemDivider>
          <IonItem>
            <IonInput
              name="password"
              value={password}
              type="password"
              placeholder="Enter Password"
              onIonChange={(e) => setPassword(e.detail.value!)}
              clearInput
              required
            />
          </IonItem>

          {errors.password && (
            <IonItem>
              <IonLabel color="danger">{errors.password}</IonLabel>
            </IonItem>
          )}

          <IonButton disabled={!email || !password} onClick={handleClick} color="primary">
            {title.toUpperCase()}
          </IonButton>

          {/* Typescript complains if arrow function is not used below */}
          <IonButton onClick={() => onSwitchMode()} color="light">
            {option.toUpperCase()}
          </IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default AuthForm;
