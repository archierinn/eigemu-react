import React from "react";
import "./App.css";
import { Provider } from "./utils/context";
import { BrowserRouter as Router } from "react-router-dom";
import Layouts from "./layout/layout";
import Axios from "axios";

Axios.defaults.baseURL = "https://backendexample.sanbersy.com/api/";

function App() {
  return (
    <div className="App">
      <Router>
        <Provider>
          <Layouts />
        </Provider>
      </Router>
    </div>
  );
}

export default App;
