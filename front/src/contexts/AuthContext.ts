import { useContext, createContext } from "react";
import { IUser } from "models/interfaces";

interface IAuth {
  user: IUser,
  isAuth: boolean,
  checkingAuth: boolean,
}

interface AuthContextProps {
  auth: IAuth,
  setAuth: (auth: IAuth) => void
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

const useAuthContext = (): AuthContextProps => useContext(AuthContext);

export {
  AuthContext,
  useAuthContext
};

export type {
  IAuth
};

