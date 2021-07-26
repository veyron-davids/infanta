import React from "react";
import { Redirect, Route } from "react-router-dom";
import auth from "./authService";

const ProtectedRoute = ({ path, component: Component, render }) => {
  return (
    <Route
      render={() => {
        if (!auth.getCurrentUser())
          return (
            <Redirect
              to={{
                pathname: "/account/signin",
                // state: { from: props.location },
              }}
            />
          );
        return  <Component /> 
      }}
    />
  );
};

export default ProtectedRoute;
