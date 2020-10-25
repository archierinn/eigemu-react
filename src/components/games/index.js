import React from "react";
import { Switch } from "react-router-dom";
import { GameProvider } from "./gameContext";
import GameTable from "./gameTable";
import GameForm from "./gameForm";
import PrivateRoute from "../../utils/privateRoutes";

const GamesEditor = () => {
  return (
    <GameProvider>
      <Switch>
        <PrivateRoute exact path="/list-games/list">
          <GameTable />
        </PrivateRoute>
        <PrivateRoute path={["/list-games/create", "/list-games/edit/:id"]}>
          <GameForm />
        </PrivateRoute>
      </Switch>
    </GameProvider>
  );
};

export default GamesEditor;
