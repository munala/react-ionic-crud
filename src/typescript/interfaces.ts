export interface UserInterface {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar?: string;
}

export interface ColorInterface {
  id: string;
  name: string;
  year: number;
  color: string;
  pantone_value: string;
}

export interface AuthInterface {
  userId?: string;
  loggedIn: boolean;
  token?: string;
}

export interface AppStateInterface {
  user: UserInterface;
  colors: [ColorInterface];
  auth: AuthInterface;
  loading: {
    user: boolean;
    colors: boolean;
    auth: boolean;
  };
  error: {
    user?: string;
    colors?: string;
    auth?: string;
  };
}

export interface ActionInterface {
  type: string;
  payload: any;
}
