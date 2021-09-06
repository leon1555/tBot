import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers"; // ./reducers/index.js but index.js not necessary

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  compose.apply(
    this,
    (() => {
      let args = [applyMiddleware(...middleware)];
      if (window.__REDUX_DEVTOOLS_EXTENSION__)
        args.push(window.__REDUX_DEVTOOLS_EXTENSION__());
      return args;
    })()
  )
);

export default store;
