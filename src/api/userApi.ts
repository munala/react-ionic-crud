import sendRequest from './requestWrapper';
import * as actionTypes from '../context/actionTypes';
import { UserInterface } from '../typescript/interfaces';

const getErrorHandler = (dispatch: Function) => (error: string) => {
  dispatch({
    type: actionTypes.SET_ERROR,
    payload: {
      error,
      page: 'user',
    },
  });
};

const beginApiCall = (dispatch: Function) => {
  dispatch({
    type: actionTypes.SET_LOADING,
    payload: {
      page: 'user',
      loading: true,
    },
  });
};

export const getUser = async (params: { dispatch: Function; id: string }) => {
  const { dispatch, id } = params;

  beginApiCall(dispatch);

  const callback = (data: any) => {
    console.log(data);
    dispatch({
      type: actionTypes.SET_USER,
      payload: data.data,
    });
  };

  await sendRequest({
    method: 'get',
    path: `users/${id}`,
    onSuccess: callback,
    onError: getErrorHandler(dispatch),
  });
};

export const addUser = async (params: { user: UserInterface; dispatch: Function }) => {
  const { user, dispatch } = params;

  const callback = (data: any) => {
    dispatch({
      type: actionTypes.ADD_USER,
      payload: data,
    });
  };

  await sendRequest({
    method: 'post',
    path: 'users',
    data: user,
    onSuccess: callback,
    onError: getErrorHandler(dispatch),
  });
};

export const getUsers = async (params: { page: number; perPage: number; dispatch: Function }) => {
  const { page, perPage, dispatch } = params;

  beginApiCall(dispatch);

  const callback = (data: any) => {
    const { data: list, total_pages: totalPages } = data;

    dispatch({
      type: actionTypes.SET_USERS,
      payload: { list, totalPages },
    });
  };

  await sendRequest({
    method: 'get',
    path: `users?page=${page}&per_page=${perPage}`,
    onSuccess: callback,
    onError: getErrorHandler(dispatch),
  });
};

export const updateUser = async (params: { user: UserInterface; dispatch: Function }) => {
  const { dispatch, user } = params;

  beginApiCall(dispatch);

  const callback = (data: any) => {
    dispatch({
      type: actionTypes.UPDATE_USER,
      payload: data,
    });
  };

  await sendRequest({
    method: 'put',
    path: `users/${user.id}`,
    data: user,
    onSuccess: callback,
    onError: getErrorHandler(dispatch),
  });
};

export const deleteUser = async (params: { id: string | undefined; dispatch: Function }) => {
  const { dispatch, id } = params;

  beginApiCall(dispatch);

  const callback = () => {
    dispatch({
      type: actionTypes.DELETE_USER,
      payload: { id },
    });
  };

  await sendRequest({
    method: 'delete',
    path: `users/${id}`,
    onSuccess: callback,
    onError: getErrorHandler(dispatch),
  });
};
