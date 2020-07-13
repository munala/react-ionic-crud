import React, { useContext, useState, useEffect } from 'react';
import {
  IonList,
  IonItem,
  IonLabel,
  IonContent,
  IonSelectOption,
  IonSelect,
  IonButton,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonAvatar,
  IonRefresher,
  IonRefresherContent,
  IonButtons,
  IonIcon,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { RefresherEventDetail } from '@ionic/core';
import { exit } from 'ionicons/icons';

import AppContext from '../../context/state';
import { SET_USER_PAGINATION, LOGOUT } from '../../context/actionTypes';
import LoadingIndicator from '../../components/LoadingIndicator';
import NewUserInput from '../../components/NewUserInput';
import { UserInterface } from '../../typescript/interfaces';
import { addUser, getUsers } from '../../api/userApi';
import logo from '../../assets/logos/Power-Symbol0.png';

import './styles.css';

const MAX_PER_PAGE = 20;

const DEFAULT_AVATAR_URL = logo;

const Users: React.FC = () => {
  const {
    users: { list: users, totalPages },
    loading: { user: loading },
    error: { user: error },
    pagination: { users: pageVariables },
    dispatch,
  } = useContext(AppContext);

  const [statePagination, setPagination] = useState(pageVariables);
  const [mounted, setMounted] = useState(false);
  const history = useHistory();

  const { page, perPage } = pageVariables;

  /**
    Get users when the component mounts and there are no users in global state
    Set `mounted` to true to indicate the component has mounted
  */
  useEffect(() => {
    if (users.length === 0) getUserList();
    setMounted(true);
  }, []);

  /**
    Detect changes in global state pagination
    Update local pagination to match
  */
  useEffect(() => {
    if (
      statePagination.perPage !== pageVariables.perPage
      || statePagination.page !== pageVariables.page
    ) {
      setPagination(pageVariables);
    }
  }, [pageVariables.perPage, pageVariables.page]);

  /**
    Detect changes in local pagination
    Load users only when the component had already been mounted
    to prevent reloading of users between navigation state changes
  */
  useEffect(() => {
    if (mounted) getUserList();
  }, [statePagination.perPage, statePagination.page]);

  const getUserList = async () => {
    await getUsers({ dispatch, page, perPage });
  };

  const setPerPageValue = (value: string) => {
    dispatch({
      type: SET_USER_PAGINATION,
      payload: {
        page: 1,
        perPage: parseInt(value, 10),
      },
    });
  };

  const setPage = (pageValue: number) => {
    dispatch({
      type: SET_USER_PAGINATION,
      payload: {
        ...pageVariables,
        page: pageValue,
      },
    });
  };

  const onItemClick = (id: string | undefined) => {
    history.push(`/users/${id}`);
  };

  const refresh = async (event: CustomEvent<RefresherEventDetail>) => {
    await getUserList();

    event.detail.complete();
  };

  // generate and fill array with values from 1 to MAX_PER_PAGE
  let perPageValues = new Array(MAX_PER_PAGE);
  perPageValues = [...perPageValues].map((number: undefined, index: number) => index + 1);

  const submitUser = async (user: UserInterface) => {
    await addUser({ user, dispatch });
  };

  const logout = () => {
    dispatch({ type: LOGOUT });
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <IonContent>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Users</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={logout}>
              <IonIcon icon={exit} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonRefresher slot="fixed" onIonRefresh={refresh}>
        <IonRefresherContent />
      </IonRefresher>

      {error && (
        <IonItem>
          <IonLabel color="danger">{error}</IonLabel>
        </IonItem>
      )}

      <NewUserInput onSubmit={submitUser} />

      <IonList>
        {users.map((user: UserInterface) => (
          <IonItem key={user.id} button onClick={() => onItemClick(user.id)}>
            <IonAvatar slot="start">
              <img src={user.avatar || DEFAULT_AVATAR_URL} />
            </IonAvatar>
            <IonLabel className="field">{user.first_name}</IonLabel>
            <IonLabel className="field">{user.last_name}</IonLabel>
            <IonLabel className="field">{user.email}</IonLabel>
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
