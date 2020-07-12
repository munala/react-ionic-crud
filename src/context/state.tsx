import { createContext } from 'react';
import * as interfaces from '../typescript/interfaces';

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
  dispatch: () => {},
};

const AppContext = createContext(initialState);

export default AppContext;
