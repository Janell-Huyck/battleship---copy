import Home from "./Home";
import SetUpBoard from "./SetUpBoard";
import Credits from "./Credits";
import PlayGame from "./PlayGame";
import DevTools from "./DevTools";

export default {
  SetUpBoard: { path: "/setup", component: SetUpBoard },
  PlayGame: { path: "/play", component: PlayGame },
  Credits: { path: "/credits", component: Credits },
  DevTools: { path: "/dev", component: DevTools },
  Home: { path: "/*", component: Home }
};
