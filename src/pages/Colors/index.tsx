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
} from '@ionic/react';
import { useHistory } from 'react-router-dom';

import AppContext from '../../context/state';
import LoadingIndicator from '../../components/LoadingIndicator';
import { ColorInterface } from '../../typescript/interfaces';
import { getColors } from '../../api/colorApi';

import './styles.css';

const MAX_PER_PAGE = 20;

const Colors: React.FC = () => {
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
    colors: { list: colors, totalPages },
    loading: { color: loading },
    error: { color: error },
    dispatch,
  } = useContext(AppContext);

  const getColorList = () => {
    getColors({ dispatch, page, perPage });
  };

  useEffect(() => {
    getColorList();
  }, []);

  useEffect(() => {
    getColorList();
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
    history.push(`/colors/${id}`);
  };

  if (loading) return <LoadingIndicator />;

  return (
    <IonContent>
      {error && (
        <IonItem>
          <IonLabel color="danger">{error}</IonLabel>
        </IonItem>
      )}
      <IonList>
        <IonListHeader>
          <IonLabel>NAME</IonLabel>
          <IonLabel>YEAR</IonLabel>
          <IonLabel>PANTONE VALUE</IonLabel>
        </IonListHeader>

        {colors.map((color: ColorInterface) => (
          <IonItem
            key={color.id}
            button
            onClick={() => onItemClick(color.id)}
            style={{ backgroundColor: color.color }}
          >
            <IonLabel>{color.name}</IonLabel>
            <IonLabel>{color.year}</IonLabel>
            <IonLabel>{color.pantone_value || ''}</IonLabel>
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
