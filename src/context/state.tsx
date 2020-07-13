import { createContext } from 'react';
import * as interfaces from '../typescript/interfaces';

const MAX_PER_PAGE = 20;

export const initialState: interfaces.AppStateInterface = {
  user: {},
  color: {},
  colors: {
    list: [],
    totalPages: 0,
  },
  users: {
    list: [],
    totalPages: 0,
  },
  auth: {
    loggedIn: false,
    token: null,
  },
  loading: {
    user: false,
    color: false,
    auth: false,
  },
  error: {
    user: null,
    color: null,
    auth: null,
  },
  pagination: {
    colors: {
      page: 1,
      perPage: MAX_PER_PAGE,
    },
    users: {
      page: 1,
      perPage: MAX_PER_PAGE,
    },
  },
  dispatch: () => {},
};

const AppContext = createContext(initialState);

export default AppContext;
