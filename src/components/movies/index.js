import React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../../utils/privateRoutes";
import MovieTable from "./movieTable";
import MovieForm from "./movieForm";
import { MovieProvider } from "./movieContext";

const MoviesEditor = () => {
  return (
    <MovieProvider>
      <Switch>
        <PrivateRoute exact path="/list-movies/list">
          <MovieTable />
        </PrivateRoute>
        <PrivateRoute path={["/list-movies/create", "/list-movies/edit/:id"]}>
          <MovieForm />
        </PrivateRoute>
      </Switch>
    </MovieProvider>
  );
};

export default MoviesEditor;
