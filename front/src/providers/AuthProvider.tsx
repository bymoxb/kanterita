import React, { useState } from "react";
import { AuthContext, IAuth } from "contexts/AuthContext";
import { IUser } from "models/interfaces";

const initialState: IAuth = {
  isAuth: false,
  checkingAuth: true,
  user: {} as IUser,
};

const AuthProvider: React.FC = ({ children }) => {

  const [auth, setAuth] = useState<IAuth>(initialState);

  const handleAuth = (_auth: IAuth) => {
    setTimeout(() => setAuth(_auth), 100);
  };

  return (
    <AuthContext.Provider value={{ auth: auth, setAuth: handleAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
