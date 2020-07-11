import { Plugins } from '@capacitor/core';
import sendRequest from './requestWrapper';
import * as actionTypes from '../context/actionTypes';
import { UserInterface } from '../typescript/interfaces';

const { Storage } = Plugins;

const getErrorHandler = (dispatch: Function) => (error: string) => {
  dispatch({
    type: actionTypes.SET_ERROR,
    payload: { error, page: 'auth' },
  });
};

const beginApiCall = (dispatch: Function) => {
  dispatch({
    type: actionTypes.SET_LOADING,
    payload: {
      page: 'auth',
      loading: true,
    },
  });
};

const authFunction = async (params: { user: UserInterface; dispatch: Function; type: string }) => {
  const { user, dispatch, type } = params;

  beginApiCall(dispatch);

  const { error, ...authData } = await sendRequest({
    method: 'post',
    path: 'register',
    data: user,
    errorHandler: getErrorHandler(dispatch),
  });

  await Storage.set({
    key: 'token',
    value: authData.token,
  });

  if (authData.id) {
    await Storage.set({
      key: 'userId',
      value: authData.id,
    });
  }

  dispatch({
    type,
    payload: authData,
  });
};

export const register = async (params: { user: UserInterface; dispatch: Function }) => {
  authFunction({
    ...params,
    type: actionTypes.REGISTER,
  });
};

export const login = async (params: { user: UserInterface; dispatch: Function }) => {
  authFunction({
    ...params,
    type: actionTypes.LOGIN,
  });
};
