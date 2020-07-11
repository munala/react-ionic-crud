import * as actionTypes from "./actionTypes";
import * as interfaces from "../typescript/interfaces";
import { initialState } from "./state";

export default (
  state: interfaces.AppStateInterface,
  action: interfaces.ActionInterface
) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.REGISTER:
      return {
        ...state,
        auth: {
          ...state.auth,
          userId: payload.id,
          token: payload.token
        },
        loading: {
          ...state.loading,
          auth: false
        }
      };

    case actionTypes.LOGIN:
      return {
        ...state,
        auth: {
          ...state.auth,
          token: payload.token
        },
        loading: {
          ...state.loading,
          auth: false
        }
      };

    case actionTypes.LOGOUT:
      return initialState;

    case actionTypes.SET_USERS:
      return {
        ...state,
        users: payload,
        loading: {
          ...state.loading,
          users: false
        }
      };

    case actionTypes.SET_USER:
      return {
        ...state,
        user: payload,
        loading: {
          ...state.loading,
          user: false
        }
      };

    case actionTypes.UPDATE_USER:
      return {
        ...state,
        user: {
          ...state.user,
          ...payload
        },
        loading: {
          ...state.loading,
          user: false
        }
      };

    case actionTypes.DELETE_USER:
      return {
        ...state,
        user: initialState.user,
        loading: {
          ...state.loading,
          user: false
        }
      };

    case actionTypes.SET_LOADING:
      return {
        ...state,
        loading: {
          [payload.page]: payload.loading
        }
      };

    case actionTypes.SET_ERROR:
      return {
        ...state,
        error: {
          [payload.page]: payload.error
        }
      };
  }
};
