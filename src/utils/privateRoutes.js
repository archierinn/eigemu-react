import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { Context } from "./context";

const PrivateRoute = ({ children, ...rest }) => {
  const { logins } = useContext(Context);
  const [login] = logins;
  return (
    <Route
      {...rest}
      render={({ location }) =>
        login ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
