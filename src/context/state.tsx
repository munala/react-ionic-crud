import { createContext } from "react";

export const initialState = {
  user: {},
  colors: [],
  users: [],
  auth: {
    userId: null,
    loggedIn: false,
    token: null
  },
  loading: {
    user: false,
    colors: false,
    auth: false
  },
  error: {
    user: null,
    colors: null,
    auth: null
  }
};

const AppContext = createContext(initialState);

export default AppContext;
