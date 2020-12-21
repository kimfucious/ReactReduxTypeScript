// import React from "react";
import { App } from "./components/App";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { reducers } from "./reducers";
import ReactDOM from "react-dom";
import thunk from "redux-thunk";

import "./styles/simplex.css";

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
