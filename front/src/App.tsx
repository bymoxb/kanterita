import React, { useEffect } from "react";
import { useAuthContext } from "contexts/AuthContext";

import {
  BrowserRouter as Router,
  Redirect,
  Switch
} from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import AuthProvider from "providers/AuthProvider";

import useAuth from "hooks/useAuth";

import PublicRoute from "routes/PublicRoute";
import PrivateRoute from "routes/PrivateRoute";

import Login from "pages/public/Login";
import PrivateLayout from "layout/PrivateLayout";

import LoadingScreen from "components/LoadingScreen";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppInit />
    </AuthProvider>
  );
};

const mdTheme = createTheme({
  // palette: {
  //   primary: {
  //     main: "#ff9015"
  //   }
  // }
});

const AppInit = () => {
  const {
    checkAuth,
  } = useAuth();

  const { auth: { checkingAuth } } = useAuthContext();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <ThemeProvider theme={mdTheme}>
      {
        checkingAuth
          ? <LoadingScreen />
          : <AppRoute />
      }
    </ThemeProvider>

  );
};

const AppRoute: React.FC = () => {
  return (
    <Router>
      <Switch>
        <PrivateRoute path="/app" component={PrivateLayout} />
        <PublicRoute path="/auth" component={Login} />
        <Redirect from="/" to="/auth" />
        <Redirect from="*" to="/" />
      </Switch>
    </Router>
  );
};

export default App;
