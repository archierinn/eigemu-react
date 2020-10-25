import React from "react";
import { Route, Switch } from "react-router-dom";
import Games from "../components/games";
import Home from "../components/home";
import Movies from "../components/movies";
import { Typography } from "antd";
import DetailMovie from "../components/detailMovie";
import DetailGame from "../components/detailGame";
import Login from "../components/login";
import GamesEditor from "../components/games/index";
import PrivateRoute from "./privateRoutes";
import MoviesEditor from "../components/movies/index";
import ChangePassword from "../components/changePassword";

const NoMatch = () => {
  const { Title } = Typography;
  return (
    <Title level={1} style={{ textAlign: "center", marginTop: "8px" }}>
      404 Page Not Found
    </Title>
  );
};

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/movies">
        <Movies />
      </Route>
      <Route exact path="/games">
        <Games />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route exact path="/movies/:id">
        <DetailMovie />
      </Route>
      <Route exact path="/games/:id">
        <DetailGame />
      </Route>
      <PrivateRoute path="/list-games">
        <GamesEditor />
      </PrivateRoute>
      <PrivateRoute path="/list-movies">
        <MoviesEditor />
      </PrivateRoute>
      <PrivateRoute path="/profile/changepwd">
        <ChangePassword />
      </PrivateRoute>
      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  );
};

export default Routes;
