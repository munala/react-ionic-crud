import { Plugins } from '@capacitor/core';
import sendRequest from './requestWrapper';
import * as actionTypes from '../context/actionTypes';
import { UserInterface } from '../typescript/interfaces';

const { Storage } = Plugins;

const getErrorHandler = (dispatch: Function) => (error: string) => {
  dispatch({
    type: actionTypes.SET_ERROR,
    payload: { error, page: 'user' },
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

export const getUser = async (params: { dispatch: Function; userId?: string | null }) => {
  const { dispatch } = params;
  let { userId } = params;

  if (!userId) {
    const { value } = await Storage.get({ key: 'userId' });
    userId = value;
  }

  beginApiCall(dispatch);

  const { data } = await sendRequest({
    method: 'get',
    path: `users/${userId}`,
    errorHandler: getErrorHandler(dispatch),
  });

  dispatch({
    type: actionTypes.SET_USER,
    payload: data,
  });
};

export const getUsers = async (params: { page: number; per_page: number; dispatch: Function }) => {
  const { page = 1, per_page = 20, dispatch } = params;

  beginApiCall(dispatch);

  const { data: list, totalPages } = await sendRequest({
    method: 'get',
    path: `users?page=${page}&per_page=${per_page}`,
    errorHandler: getErrorHandler(dispatch),
  });

  dispatch({
    type: actionTypes.SET_USERS,
    payload: { list, totalPages },
  });
};

export const updateUser = async (params: {
  user: UserInterface;
  dispatch: Function;
  type: string;
}) => {
  const { dispatch, user } = params;

  const { value: userId } = await Storage.get({ key: 'userId' });

  beginApiCall(dispatch);

  const { error, ...userData } = await sendRequest({
    method: 'put',
    path: `users/${userId}`,
    data: user,
    errorHandler: getErrorHandler(dispatch),
  });

  dispatch({
    type: actionTypes.UPDATE_USER,
    payload: userData,
  });
};

export const deleteUser = async (params: {
  user: UserInterface;
  dispatch: Function;
  type: string;
}) => {
  const { dispatch } = params;

  const { value: userId } = await Storage.get({ key: 'userId' });

  beginApiCall(dispatch);

  const { error, ...userData } = await sendRequest({
    method: 'delete',
    path: `users/${userId}`,
    errorHandler: getErrorHandler(dispatch),
  });

  dispatch({
    type: actionTypes.LOGOUT,
    payload: userData,
  });
};
