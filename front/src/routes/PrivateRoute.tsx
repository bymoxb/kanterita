import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useAuthContext } from "contexts/AuthContext";

interface IPrivateRoute extends RouteProps {
  component: any;
}

const PrivateRoute: React.FC<IPrivateRoute> = ({
  component: Component,
  ...rest
}) => {

  const { auth: { isAuth } } = useAuthContext();

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth
          ? <Component {...props} />
          : <Redirect to={"/auth"} />
      }
    />
  );
};

export default PrivateRoute;
