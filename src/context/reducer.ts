import * as actionTypes from './actionTypes';
import * as interfaces from '../typescript/interfaces';
import { initialState } from './state';

export default (
  state: interfaces.AppStateInterface,
  action: interfaces.ActionInterface,
): interfaces.AppStateInterface => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.REGISTER:
      return {
        ...state,
        auth: {
          ...state.auth,
          userId: payload.id,
          token: payload.token,
          loggedIn: true,
        },
        loading: {
          ...state.loading,
          auth: false,
        },
      };

    case actionTypes.LOGIN:
      return {
        ...state,
        auth: {
          ...state.auth,
          token: payload.token,
          loggedIn: true,
        },
        loading: {
          ...state.loading,
          auth: false,
        },
      };

    case actionTypes.LOGOUT:
      return initialState;

    case actionTypes.SET_COLORS:
      return {
        ...state,
        colors: payload,
        loading: {
          ...state.loading,
          color: false,
        },
      };

    case actionTypes.SET_COLOR:
      return {
        ...state,
        color: payload,
        loading: {
          ...state.loading,
          color: false,
        },
      };

    case actionTypes.SET_USERS:
      console.log(payload);
      return {
        ...state,
        users: payload,
        loading: {
          ...state.loading,
          user: false,
        },
      };

    case actionTypes.SET_USER:
      return {
        ...state,
        user: payload,
        loading: {
          ...state.loading,
          user: false,
        },
      };

    case actionTypes.UPDATE_USER:
      return {
        ...state,
        user: {
          ...state.user,
          ...payload,
        },
        loading: {
          ...state.loading,
          user: false,
        },
      };

    case actionTypes.DELETE_USER:
      return {
        ...state,
        user: initialState.user,
        loading: {
          ...state.loading,
          user: false,
        },
      };

    case actionTypes.SET_LOADING:
      return {
        ...state,
        loading: {
          ...state.loading,
          [payload.page]: payload.loading,
        },
      };

    case actionTypes.SET_ERROR:
      return {
        ...state,
        error: {
          ...state.error,
          [payload.page]: payload.error,
        },
      };

    default:
      return state;
  }
};
