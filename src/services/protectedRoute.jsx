import React from "react";
import { Redirect, Route } from "react-router-dom";
import auth from "./authService";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  return (
    <Route
      {...restOfProps}
      render={(props) =>
        auth.getCurrentUser() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/account/signin",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

export default ProtectedRoute;
