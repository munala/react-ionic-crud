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
  IonRefresher,
  IonRefresherContent,
  IonButtons,
  IonIcon,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { RefresherEventDetail } from '@ionic/core';
import { exit } from 'ionicons/icons';

import AppContext from '../../context/state';
import { SET_COLOR_PAGINATION, LOGOUT } from '../../context/actionTypes';
import LoadingIndicator from '../../components/LoadingIndicator';
import { ColorInterface } from '../../typescript/interfaces';
import { getColors } from '../../api/colorApi';

const MAX_PER_PAGE = 20;

const Colors: React.FC = () => {
  const {
    colors: { list: colors, totalPages },
    loading: { color: loading },
    error: { color: error },
    pagination: { colors: pageVariables },
    dispatch,
  } = useContext(AppContext);

  const [statePagination, setPagination] = useState(pageVariables);
  const [mounted, setMounted] = useState(false);
  const history = useHistory();

  const { page, perPage } = pageVariables;

  const getColorList = async () => {
    await getColors({ dispatch, page, perPage });
  };

  /**
    Get colors when the component mounts and there are no colors in state
    Set `mounted` to true to indicate the component has mounted
  */
  useEffect(() => {
    if (colors.length === 0) getColorList();
    setMounted(true);
  }, []);

  /**
    Get detect changes in global state pagination and
    update local pagination to match
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
    Load colors only when the component had already been mounted
  */
  useEffect(() => {
    if (mounted) getColorList();
  }, [statePagination.perPage, statePagination.page]);

  const setPerPageValue = (value: string) => {
    dispatch({
      type: SET_COLOR_PAGINATION,
      payload: {
        page: 1,
        perPage: parseInt(value, 10),
      },
    });
  };

  const setPage = (pageValue: number) => {
    dispatch({
      type: SET_COLOR_PAGINATION,
      payload: {
        ...pageVariables,
        page: pageValue,
      },
    });
  };

  const onItemClick = (id: string | undefined) => {
    history.push(`/colors/${id}`);
  };

  const refresh = async (event: CustomEvent<RefresherEventDetail>) => {
    await getColorList();

    event.detail.complete();
  };

  // generate and fill array with values from 1 to MAX_PER_PAGE
  let perPageValues = new Array(MAX_PER_PAGE);
  perPageValues = [...perPageValues].map((number: undefined, index: number) => index + 1);

  const logout = () => {
    dispatch({ type: LOGOUT });
  };

  if (loading) return <LoadingIndicator />;

  return (
    <IonContent>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Colors</IonTitle>
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

      <IonList>
        <IonListHeader>
          <IonLabel>Name</IonLabel>
          <IonLabel>Hex Value</IonLabel>
          <IonLabel>Year</IonLabel>
        </IonListHeader>

        {colors.map((color: ColorInterface) => (
          <IonItem
            key={color.id}
            button
            onClick={() => onItemClick(color.id)}
            style={{ backgroundColor: color.color }}
          >
            <IonLabel>{color.name}</IonLabel>
            <IonLabel>{color.color}</IonLabel>
            <IonLabel>{color.year}</IonLabel>
          </IonItem>
        ))}
      </IonList>

      <IonItem>
        <IonLabel>Colors per page</IonLabel>

        <IonSelect
          value={perPage}
          placeholder="Select number of colors per page"
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

export default Colors;
