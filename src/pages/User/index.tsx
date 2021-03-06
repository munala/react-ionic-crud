import React, { useContext, useEffect, useState } from 'react';
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
  IonButton,
  IonAvatar,
  IonAlert,
} from '@ionic/react';
import { useHistory, useParams } from 'react-router-dom';

import { UserInterface } from '../../typescript/interfaces';
import LoadingIndicator from '../../components/LoadingIndicator';
import EditableLabel from '../../components/EditableLabel';
import { getUser, updateUser, deleteUser } from '../../api/userApi';

import AppContext from '../../context/state';

/**
  If you add a user and try to open the user it will not work
  reqres.in has fixed mock data hence finding a user using an ID that
  does not exist in their mock database will not work
  It will always return a 404 error
  Open a user who has been retreived from the api
*/

const User: React.FC = () => {
  const {
    user,
    loading: { user: loading },
    error: { user: error },
    dispatch,
  } = useContext(AppContext);

  const [stateUser, setStateUser] = useState({} as UserInterface);
  const [editMode, setEditMode] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    getUser({ id, dispatch });
  }, [id, dispatch]);

  useEffect(() => {
    setStateUser(user);
  }, [user]);

  const switchEditMode = (edit: boolean) => {
    setEditMode(edit);

    setStateUser(edit ? { ...user } : {});
  };

  const setUserField = (params: { field: string; value: string }) => {
    const { field, value } = params;

    setStateUser({ ...stateUser, [field]: value });
  };

  const saveUser = () => {
    updateUser({ user: stateUser, dispatch });

    setEditMode(false);
  };

  const deleteCurrentUser = async () => {
    setShowDelete(false);

    await deleteUser({
      id: user.id,
      dispatch,
    });

    history.goBack();
  };

  if (loading) return <LoadingIndicator />;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="users" />
          </IonButtons>

          <IonTitle>{error ? 'Error' : `${user.first_name} ${user.last_name}`}</IonTitle>
        </IonToolbar>
      </IonHeader>

      {error ? (
        <IonContent>
          <IonItem>
            <IonLabel color="danger">{error}</IonLabel>
          </IonItem>
        </IonContent>
      ) : (
        <IonContent>
          <IonItem>
            <IonAvatar>
              <img src={user.avatar} />
            </IonAvatar>
          </IonItem>

          <EditableLabel
            editMode={editMode}
            label="First Name:"
            value={stateUser.first_name}
            name="first_name"
            placeholder="Enter First Name"
            onChange={(value: string) => setUserField({ field: 'first_name', value })}
          />

          <EditableLabel
            editMode={editMode}
            label="Last Name:"
            value={stateUser.last_name}
            name="last_name"
            placeholder="Enter Last Name"
            onChange={(value: string) => setUserField({ field: 'last_name', value })}
          />

          <EditableLabel
            editMode={editMode}
            label="Email:"
            value={stateUser.email}
            name="email"
            placeholder="Enter Email"
            onChange={(value: string) => setUserField({ field: 'email', value })}
          />

          <IonItem>
            <IonButton
              onClick={() => (editMode ? saveUser() : switchEditMode(true))}
              color="primary"
            >
              {`${editMode ? 'Save' : 'Edit'} User`}
            </IonButton>

            {editMode && (
              <IonButton onClick={() => switchEditMode(false)} color="light">
                Cancel
              </IonButton>
            )}
          </IonItem>

          <IonItem>
            <IonButton onClick={() => setShowDelete(true)} color="danger">
              Delete User
            </IonButton>
          </IonItem>

          <IonAlert
            isOpen={showDelete}
            onDidDismiss={() => setShowDelete(false)}
            cssClass="my-custom-class"
            header="Delete User"
            message={`Are you sure you want to delete ${user.first_name} ${user.last_name}?`}
            buttons={[
              'Cancel',
              {
                text: 'Delete',
                role: 'destructive',
                handler: deleteCurrentUser,
              },
            ]}
          />
        </IonContent>
      )}
    </IonPage>
  );
};

export default User;
