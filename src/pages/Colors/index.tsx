import React, { useContext, useState, useEffect } from 'react';
import {
  IonList,
  IonItem,
  IonLabel,
  IonContent,
  IonSelectOption,
  IonSelect,
  IonButton,
} from '@ionic/react';
import AppContext from '../../context/state';
import LoadingIndicator from '../../components/LoadingIndicator';
import { ColorInterface } from '../../typescript/interfaces';
import { getColors } from '../../api/colorApi';

import './styles.css';

const MAX_PER_PAGE = 20;

const Colors: React.FC = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(MAX_PER_PAGE);

  // generate and fill array with values from 1 to MAX_PER_PAGE
  let numberArray = new Array(MAX_PER_PAGE);
  numberArray = [...numberArray].map((number: undefined, index: number) => index + 1);

  const {
    colors,
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

  const selectPerPageValue = (value: string) => {
    setPage(1);
    setPerPage(parseInt(value, 10));
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
        <IonItem>
          <IonLabel>NAME</IonLabel>
          <IonLabel>YEAR</IonLabel>
          <IonLabel>PANTONE VALUE</IonLabel>
        </IonItem>

        {colors.map((color: ColorInterface) => (
          <IonItem key={color.id} style={{ backgroundColor: color.color }}>
            <IonLabel>{color.name}</IonLabel>
            <IonLabel>{color.year}</IonLabel>
            <IonLabel>{color.pantone_value || ''}</IonLabel>
          </IonItem>
        ))}

        <IonItem>
          <IonLabel>Colors per page</IonLabel>
          <IonSelect
            value={perPage}
            placeholder="Select number of colors per page"
            onIonChange={(e) => selectPerPageValue(e.detail.value)}
          >
            {numberArray.map((perPageValue: number) => (
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
          <IonLabel>{` Page ${page} `}</IonLabel>
          <IonButton disabled={colors.length === 0} onClick={() => setPage(page + 1)} color="light">
            Next
          </IonButton>
        </IonItem>
      </IonList>
    </IonContent>
  );
};

export default Colors;
