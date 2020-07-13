import sendRequest from './requestWrapper';
import * as actionTypes from '../context/actionTypes';
import { UserInterface } from '../typescript/interfaces';

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

  const callback = (authData: any) => {
    dispatch({
      type,
      payload: authData,
    });
  };

  await sendRequest({
    method: 'post',
    path: 'register',
    data: user,
    onSuccess: callback,
    onError: getErrorHandler(dispatch),
  });
};

// replacing mock data with real data since the api does not accept real data
export const register = async (params: {
  user: { email: string; password: string };
  dispatch: Function;
}) => {
  authFunction({
    user: params.user,
    dispatch: params.dispatch,
    type: actionTypes.REGISTER,
  });
};

// replacing mock data with real data since the api does not accept real data
export const login = async (params: {
  user: { email: string; password: string };
  dispatch: Function;
}) => {
  authFunction({
    user: params.user,
    dispatch: params.dispatch,
    type: actionTypes.LOGIN,
  });
};
