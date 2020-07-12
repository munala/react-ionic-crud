import React, { useContext, useState, useEffect } from 'react';
import {
  IonList,
  IonItem,
  IonLabel,
  IonContent,
  IonSelectOption,
  IonSelect,
  IonButton,
  IonListHeader,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonAvatar,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';

import AppContext from '../../context/state';
import LoadingIndicator from '../../components/LoadingIndicator';
import { UserInterface } from '../../typescript/interfaces';
import { getUsers } from '../../api/userApi';

import './styles.css';

const MAX_PER_PAGE = 20;

const Users: React.FC = () => {
  const [pageVariables, setPageVariables] = useState({
    page: 1,
    perPage: MAX_PER_PAGE,
  });

  const { page, perPage } = pageVariables;

  const history = useHistory();

  // generate and fill array with values from 1 to MAX_PER_PAGE
  let perPageValues = new Array(MAX_PER_PAGE);
  perPageValues = [...perPageValues].map((number: undefined, index: number) => index + 1);

  const {
    users: { list: users, totalPages },
    loading: { user: loading },
    error: { user: error },
    dispatch,
  } = useContext(AppContext);

  const getUserList = () => {
    getUsers({ dispatch, page, perPage });
  };

  useEffect(() => {
    getUserList();
  }, []);

  useEffect(() => {
    getUserList();
  }, [perPage, page]);

  const setPerPageValue = (value: string) => {
    setPageVariables({
      page: 1,
      perPage: parseInt(value, 10),
    });
  };

  const setPage = (pageValue: number) => {
    setPageVariables({
      ...pageVariables,
      page: pageValue,
    });
  };

  const onItemClick = (id: string | undefined) => {
    history.push(`/users/${id}`);
  };

  if (loading) return <LoadingIndicator />;

  return (
    <IonContent>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Users</IonTitle>
        </IonToolbar>
      </IonHeader>
      {error && (
        <IonItem>
          <IonLabel color="danger">{error}</IonLabel>
        </IonItem>
      )}
      <IonList>
        <IonListHeader>
          <IonLabel>Avatar</IonLabel>
          <IonLabel>First Name</IonLabel>
          <IonLabel>Last Name</IonLabel>
          <IonLabel>Email</IonLabel>
        </IonListHeader>

        {users.map((user: UserInterface) => (
          <IonItem key={user.id} button onClick={() => onItemClick(user.id)}>
            <IonAvatar slot="start">
              <img src={user.avatar} />
            </IonAvatar>
            <IonLabel>{user.first_name}</IonLabel>
            <IonLabel>{user.last_name}</IonLabel>
            <IonLabel>{user.email}</IonLabel>
          </IonItem>
        ))}
      </IonList>

      <IonItem>
        <IonLabel>Users per page</IonLabel>
        <IonSelect
          value={perPage}
          placeholder="Select number of users per page"
          onIonChange={(e) => setPerPageValue(e.detail.value)}
        >
          {perPageValues.map((perPageValue: number) => (
            <IonSelectOption key={perPageValue} value={perPageValue}>
              {perPageValue}
            </IonSelectOption>
          ))}
        </IonSelect>
      </IonItem>

      <IonItem>
        <IonButton disabled={page === 1} onClick={() => setPage(page - 1)} color="light">
          Previous
        </IonButton>
        <IonLabel>{` Page ${page} of ${totalPages} `}</IonLabel>
        <IonButton disabled={page === totalPages} onClick={() => setPage(page + 1)} color="light">
          Next
        </IonButton>
      </IonItem>
    </IonContent>
  );
};

export default Users;
