export interface UserInterface {
  id?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
}

export interface ColorInterface {
  id?: string;
  name?: string;
  year?: number;
  color?: string;
  pantone_value?: string;
}

export interface AuthInterface {
  userId?: string | null;
  loggedIn: boolean;
  token?: string | null;
}

export interface AppStateInterface {
  user: UserInterface;
  users: UserInterface[];
  color: ColorInterface;
  colors: ColorInterface[];
  auth: AuthInterface;
  loading: {
    user: boolean;
    color: boolean;
    auth: boolean;
  };
  error: {
    user?: string | null;
    color?: string | null;
    auth?: string | null;
  };
  dispatch: Function; // this is to allow passing dispatch inside value of context provider
}

export interface ActionInterface {
  type: string;
  payload: any;
}

export interface RequestArgumentInterface {
  method: string;
  path: string;
  errorHandler: Function;
  data?: any;
  callback?: Function;
}
