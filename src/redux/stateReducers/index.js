import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import * as auth from "./auth";
import * as messages from "./messages";
import * as setUpGame from "./setUpGame";
import * as play from "./play";
import * as manipulateBoards from "./manipulateBoards";
import * as welcome from "./welcome";
import * as waitScreen from "./waitScreen";
import * as winner from "./winner";

export default history =>
  combineReducers({
    router: connectRouter(history),
    auth: combineReducers(auth),
    messages: combineReducers(messages),
    setUpGame: combineReducers(setUpGame),
    play: combineReducers(play),
    manipulateBoards: combineReducers(manipulateBoards),
    welcome: combineReducers(welcome),
    waitScreen: combineReducers(waitScreen),
    winner: combineReducers(winner)
  });
