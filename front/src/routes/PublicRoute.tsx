import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

interface IPublicRoute extends RouteProps {
  component: any;
}

const PublicRoute: React.FC<IPublicRoute> = ({
  component: Component,
  ...rest
}) => {
  const { auth: { isAuth } } = useAuthContext();

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth
          ? <Redirect to={"/app"} />
          : <Component {...props} />
      }
    />
  );
};

export default PublicRoute;
