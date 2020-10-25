import Axios from "axios";
import React, { useState, useEffect, createContext } from "react";
import { message } from "antd";

export const GameContext = createContext();

export const GameProvider = (props) => {
  const [editedIndex, setEditedIndex] = useState(-1);
  const [objectData, setObjectData] = useState({
    id: null,
    name: "",
    singlePlayer: null,
    genre: "",
    multiplayer: null,
    platform: "",
    release: "",
    image_url: "",
  });
  const [games, setGames] = useState(null);
  const [filterGenre, setFilterGenre] = useState([]);
  const [filterRelease, setFilterRelease] = useState([]);

  const setFilter = (array) => {
    let dataFilterGenres = [];
    let filterGenres = [];
    let dataFilterReleases = [];
    let filterReleases = [];
    array.forEach((el) => {
      if (!dataFilterGenres.includes(el.genre)) {
        dataFilterGenres.push(el.genre);
        filterGenres.push({ text: el.genre, value: el.genre });
      }
      if (!dataFilterReleases.includes(el.release)) {
        dataFilterReleases.push(el.release);
        filterReleases.push({ text: el.release, value: el.release });
      }
    });
    filterGenres.sort((a, b) =>
      a.text !== b.text ? (a.text < b.text ? -1 : 1) : 0
    );
    filterReleases.sort((a, b) =>
      a.text !== b.text ? (a.text < b.text ? -1 : 1) : 0
    );
    filterReleases.reverse();
    setFilterGenre(filterGenres);
    setFilterRelease(filterReleases);
  };

  useEffect(() => {
    if (!games) {
      Axios.get("/data-game")
        .then((res) => {
          if (res.status === 200) {
            setGames(res.data);
            setFilter(res.data);
          }
        })
        .catch((error) => {
          message.error(error.message);
        });
    }
  }, [games]);

  return (
    <GameContext.Provider
      value={{
        games: [games, setGames],
        editedIndexs: [editedIndex, setEditedIndex],
        objectDatas: [objectData, setObjectData],
        filters: [filterGenre, filterRelease],
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
};
