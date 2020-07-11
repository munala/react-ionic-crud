import { createContext } from "react";

export const initialState = {
  user: {},
  users: [],
  auth: {
    userId: null,
    loggedIn: false,
    token: null
  },
  loading: {
    user: false,
    users: false,
    auth: false
  },
  error: {
    user: null,
    users: null,
    auth: null
  }
};

const AppContext = createContext(initialState);

export default AppContext;
