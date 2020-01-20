import { domain, jsonHeaders, handleJsonResponse } from "./constants";
import {
  POSTMESSAGE,
  FETCHLASTMESSAGE,
  DELETEMESSAGE,
  GETOLDMESSAGES
} from "../actionTypes";

const url = domain + "/messages";

export const postMessage = messageData => (dispatch, getState) => {
  dispatch({
    type: POSTMESSAGE.START
  });
  const token = getState().auth.login.result.token;
  return fetch(url, {
    method: "POST",
    headers: { ...jsonHeaders, Authorization: "Bearer " + token },
    body: JSON.stringify(messageData)
  })
    .then(handleJsonResponse)
    .then(result => {
      return dispatch({
        type: POSTMESSAGE.SUCCESS,
        payload: result
      });
    })
    .catch(err => {
      return Promise.reject(dispatch({ type: POSTMESSAGE.FAIL, payload: err }));
    });
};

export const fetchLastMessage = playerName => dispatch => {
  dispatch({
    type: FETCHLASTMESSAGE.START
  });
  return fetch(url + `?limit=1&offset=0&username=` + playerName, {
    method: "GET",
    headers: jsonHeaders
  })
    .then(handleJsonResponse)
    .then(result => {
      return dispatch({
        type: FETCHLASTMESSAGE.SUCCESS,
        payload: result
      });
    })
    .catch(err => {
      return Promise.reject(
        dispatch({ type: FETCHLASTMESSAGE.FAIL, payload: err })
      );
    });
};

export const deleteMessage = (messageId, token) => dispatch => {
  dispatch({
    type: DELETEMESSAGE.START
  });
  return fetch(url + `/` + messageId, {
    method: "DELETE",
    headers: { ...jsonHeaders, Authorization: "Bearer " + token }
  })
    .then(handleJsonResponse)
    .then(result => {
      return dispatch({
        type: DELETEMESSAGE.SUCCESS,
        payload: result
      });
    })
    .catch(err => {
      return Promise.reject(
        dispatch({ type: DELETEMESSAGE.FAIL, payload: err })
      );
    });
};

export const getOldMessages = playerName => dispatch => {
  dispatch({
    type: GETOLDMESSAGES.START
  });
  return fetch(url + `?limit=100&offset=0&username=` + playerName, {
    method: "GET",
    headers: jsonHeaders
  })
    .then(handleJsonResponse)
    .then(result => {
      return dispatch({
        type: GETOLDMESSAGES.SUCCESS,
        payload: result
      });
    })
    .catch(err => {
      return Promise.reject(
        dispatch({ type: GETOLDMESSAGES.FAIL, payload: err })
      );
    });
};
