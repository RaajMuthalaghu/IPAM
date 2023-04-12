import React from "react";
import ReactDOM from "react-dom";
//import { BrowserRouter } from "react-router-dom";

import App from "./App";
//import * as serviceWorker from "./serviceWorker";
import { Provider } from 'react-redux';
import store from './store';

// ReactDOM.render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>,
//   document.getElementById("root")
// );

// serviceWorker.unregister();
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);