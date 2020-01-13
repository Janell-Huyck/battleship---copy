import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import * as auth from "./auth";
import * as messages from "./messages";
import * as setUpGame from "./setUpGame";
import * as welcome from "./welcome";
import * as waitScreen from "./waitScreen";

export default history =>
  combineReducers({
    router: connectRouter(history),
    auth: combineReducers(auth),
    messages: combineReducers(messages),
    setUpGame: combineReducers(setUpGame),
    welcome: combineReducers(welcome),
    waitScreen: combineReducers(waitScreen)
  });
