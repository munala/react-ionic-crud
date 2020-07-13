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

    case actionTypes.ADD_USER:
      return {
        ...state,
        users: {
          ...state.users,
          list: [payload, ...state.users.list],
        },
      };

    case actionTypes.UPDATE_USER:
      const newUser = {
        ...state.user,
        ...payload,
      };

      return {
        ...state,
        user: newUser,
        users: {
          ...state.users,
          list: [...state.users.list].map((user: interfaces.UserInterface) => (user.id === newUser.id ? newUser : user)),
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
        users: {
          ...state.users,
          list: [...state.users.list].filter(
            (user: interfaces.UserInterface) => user.id !== payload.id,
          ),
        },
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

    case actionTypes.SET_COLOR_PAGINATION:
      console.log(payload);
      return {
        ...state,
        pagination: {
          ...state.pagination,
          colors: {
            ...state.pagination.colors,
            ...payload,
          },
        },
      };

    case actionTypes.SET_USER_PAGINATION:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          users: {
            ...state.pagination.users,
            ...payload,
          },
        },
      };

    default:
      return state;
  }
};
