import sendRequest from './requestWrapper';
import * as actionTypes from '../context/actionTypes';

const getErrorHandler = (dispatch: Function) => (error: string) => {
  dispatch({
    type: actionTypes.SET_ERROR,
    payload: { error, page: 'color' },
  });
};

const beginApiCall = (dispatch: Function) => {
  dispatch({
    type: actionTypes.SET_LOADING,
    payload: {
      page: 'color',
      loading: true,
    },
  });
};

export const getColor = async (params: { dispatch: Function; id: string }) => {
  const { dispatch, id } = params;

  beginApiCall(dispatch);

  const callback = (data: any) => {
    dispatch({
      type: actionTypes.SET_COLOR,
      payload: data.data,
    });
  };

  await sendRequest({
    method: 'get',
    path: `colors/${id}`,
    onSuccess: callback,
    onError: getErrorHandler(dispatch),
  });
};

export const getColors = async (params: { page: number; perPage: number; dispatch: Function }) => {
  const { page, perPage, dispatch } = params;

  beginApiCall(dispatch);

  const callback = (data: any) => {
    const { data: list, total_pages: totalPages } = data;

    dispatch({
      type: actionTypes.SET_COLORS,
      payload: { list, totalPages },
    });
  };

  await sendRequest({
    method: 'get',
    path: `colors?page=${page}&per_page=${perPage}`,
    onSuccess: callback,
    onError: getErrorHandler(dispatch),
  });
};
