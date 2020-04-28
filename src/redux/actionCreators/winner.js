import { domain, jsonHeaders, handleJsonResponse } from "./constants";
import { WINNER, POSTWINNER } from "../actionTypes";

const url = domain + "/messages";

export const _postWinner = messageData => (dispatch, getState) => {
  dispatch({
    type: POSTWINNER.START
  });
  const token = getState().auth.login.result.token;
  //   const player = getState().auth.login.result.userName;
  return fetch(url, {
    method: "POST",
    headers: { ...jsonHeaders, Authorization: "Bearer " + token },
    body: JSON.stringify(messageData)
  })
    .then(handleJsonResponse)
    .then(result => {
      return dispatch({
        type: POSTWINNER.SUCCESS,
        payload: result
      });
    })
    .catch(err => {
      return Promise.reject(dispatch({ type: POSTWINNER.FAIL, payload: err }));
    });
};

export const winner = playerName => dispatch => {
  return dispatch({
    type: WINNER.SUCCESS,
    payload: playerName
  });
};

export const postWinner = (playerName, messageData) => dispatch => {
  return dispatch(_postWinner(messageData)).then(() => {
    return dispatch(winner(playerName));
  });
};
