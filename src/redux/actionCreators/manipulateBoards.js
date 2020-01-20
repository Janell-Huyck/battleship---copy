import { STARTBOARD, UPDATEBOARD } from "../actionTypes";

export const startBoard = originalBoard => dispatch => {
  return dispatch({
    type: STARTBOARD.SUCCESS,
    payload: originalBoard
  });
};

export const updateBoard = (
  player,
  coordinates,
  shipName,
  torpedo
) => dispatch => {
  if (shipName === null) {
    return dispatch({
      type: UPDATEBOARD.SUCCESS,
      payload: { player, coordinates, torpedo }
    });
  }
  return dispatch({
    type: UPDATEBOARD.SUCCESS,
    payload: { player, coordinates, shipName, torpedo }
  });
};
