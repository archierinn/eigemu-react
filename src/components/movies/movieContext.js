import Axios from "axios";
import React, { useState, useEffect, createContext } from "react";
import { message } from "antd";

export const MovieContext = createContext();

export const MovieProvider = (props) => {
  const [editedIndex, setEditedIndex] = useState(-1);
  const [objectData, setObjectData] = useState({
    id: null,
    title: "",
    genre: "",
    description: "",
    year: null,
    rating: 0,
    duration: 0,
    review: "",
    image_url: "",
  });
  const [movies, setMovies] = useState(null);

  const [filterGenre, setFilterGenre] = useState([]);
  const [filterYear, setFilterYear] = useState([]);

  const setFilter = (array) => {
    let dataFilterGenres = [];
    let filterGenres = [];
    let dataFilterYears = [];
    let filterYears = [];
    array.forEach((el) => {
      if (!dataFilterGenres.includes(el.genre)) {
        dataFilterGenres.push(el.genre);
        filterGenres.push({ text: el.genre, value: el.genre });
      }
      if (!dataFilterYears.includes(el.year)) {
        dataFilterYears.push(el.year);
        filterYears.push({ text: el.year, value: el.year });
      }
    });
    filterGenres.sort((a, b) =>
      a.text !== b.text ? (a.text < b.text ? -1 : 1) : 0
    );
    filterYears.sort((a, b) =>
      a.text !== b.text ? (a.text < b.text ? -1 : 1) : 0
    );
    filterYears.reverse();
    setFilterGenre(filterGenres);
    setFilterYear(filterYears);
  };

  useEffect(() => {
    if (!movies) {
      Axios.get(`https://backendexample.sanbersy.com/api/data-movie`)
        .then((res) => {
          if (res.status === 200) {
            setMovies(res.data);
            setFilter(res.data);
          }
        })
        .catch((error) => {
          message.error(error.message);
        });
    }
  }, [movies]);

  return (
    <MovieContext.Provider
      value={{
        movies: [movies, setMovies],
        editedIndexs: [editedIndex, setEditedIndex],
        objectDatas: [objectData, setObjectData],
        filters: [filterGenre, filterYear],
      }}
    >
      {props.children}
    </MovieContext.Provider>
  );
};
