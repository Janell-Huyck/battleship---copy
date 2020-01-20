import { OPPONENTTORPEDOCOORDINATES } from "../actionTypes";

export const opponentTorpedoCoordinates = coordinates => dispatch => {
  return dispatch({
    type: OPPONENTTORPEDOCOORDINATES.SUCCESS,
    payload: coordinates
  });
};
