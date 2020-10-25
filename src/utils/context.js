import Axios from "axios";
import React, { useState, useEffect, createContext } from "react";
import { useHistory } from "react-router-dom";

const getSessionStorage = () => {
  const session = JSON.parse(sessionStorage.getItem("login"));
  Axios.defaults.headers.common["Authorization"] = session
    ? `Bearer ${session.token}`
    : null;
  return session || null;
};

export const Context = createContext(getSessionStorage());

export const Provider = (props) => {
  const [login, setLogin] = useState(getSessionStorage());
  const history = useHistory();

  useEffect(() => {
    if (!login) {
      setLogin(getSessionStorage());
    }
  }, [login]);

  return (
    <Context.Provider value={{ logins: [login, setLogin], history }}>
      {props.children}
    </Context.Provider>
  );
};
