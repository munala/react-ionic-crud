export interface UserInterface {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar?: string;
}

export interface AuthInterface {
  userId?: string;
  loggedIn: boolean;
  token?: string;
}

export interface AppStateInterface {
  user: UserInterface;
  users: [UserInterface];
  auth: AuthInterface;
  loading: {
    user: boolean;
    users: boolean;
    auth: boolean;
  };
  error: {
    user?: string;
    users?: string;
    auth?: string;
  };
}

export interface ActionInterface {
  type: string;
  payload: any;
}
