import {
  PLACEBATTLESHIP,
  PLACECARRIER,
  PLACECRUISER,
  PLACEDESTROYER,
  PLACESUBMARINE,
  SELECTSHIP
} from "../actionTypes";

export const placeBattleship = messageData => dispatch => {
  return dispatch({
    type: PLACEBATTLESHIP.SUCCESS,
    payload: messageData
  });
};

export const placeCarrier = messageData => dispatch => {
  return dispatch({
    type: PLACECARRIER.SUCCESS,
    payload: messageData
  });
};

export const placeCruiser = messageData => dispatch => {
  return dispatch({
    type: PLACECRUISER.SUCCESS,
    payload: messageData
  });
};

export const placeDestroyer = messageData => dispatch => {
  return dispatch({
    type: PLACEDESTROYER.SUCCESS,
    payload: messageData
  });
};

export const placeSubmarine = messageData => dispatch => {
  return dispatch({
    type: PLACESUBMARINE.SUCCESS,
    payload: messageData
  });
};

export const selectShip = messageData => dispatch => {
  return dispatch({
    type: SELECTSHIP.SUCCESS,
    payload: messageData
  });
};
