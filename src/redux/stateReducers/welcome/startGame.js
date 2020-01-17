import { STARTGAME } from "../../actionTypes";
import { withAsyncReducer } from "../../HORs";

const initialState = {
  result: null,
  loading: false,
  error: null
};

const getInitStateFromStorage = (key, initialState) => {
  const storedState = JSON.parse(localStorage.getItem(key));

  if (storedState) {
    const unchangedInitialStateProps =
      Object.keys(storedState).every(
        property => initialState[property] !== undefined
      ) &&
      Object.keys(initialState).every(
        property => storedState[property] !== undefined
      );
    if (unchangedInitialStateProps) {
      return storedState;
    }
  }
  return initialState;
};

const startGame = (
  state = getInitStateFromStorage("startGame", initialState),
  action
) => {
  switch (action.type) {
    case STARTGAME.SUCCESS:
      return { ...initialState };
    default:
      return state;
  }
};

export default withAsyncReducer(STARTGAME, startGame);
