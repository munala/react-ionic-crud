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

export const getColor = async (params: { dispatch: Function; id?: string | null }) => {
  const { dispatch, id } = params;

  beginApiCall(dispatch);

  const { data } = await sendRequest({
    method: 'get',
    path: `colors/${id}`,
    errorHandler: getErrorHandler(dispatch),
  });

  dispatch({
    type: actionTypes.SET_COLOR,
    payload: data,
  });
};

export const getColors = async (params: { page: number; perPage: number; dispatch: Function }) => {
  const { page = 1, perPage = 6, dispatch } = params;

  beginApiCall(dispatch);

  const {
    data: { data: list, total_pages: totalPages },
  } = await sendRequest({
    method: 'get',
    path: `colors?page=${page}&per_page=${perPage}`,
    errorHandler: getErrorHandler(dispatch),
  });

  dispatch({
    type: actionTypes.SET_COLORS,
    payload: { list, totalPages },
  });
};
