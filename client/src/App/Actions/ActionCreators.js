import fetch from "isomorphic-fetch";
import * as actions from "../Actions/Actions";

function requestFeatures() {
  return {
    type: actions.REQUEST_FEATURES,
    payload: {},
  }
}

function receiveFeatures(features) {
  return {
    type: actions.RECEIVE_FEATURES,
    payload: {
      features,
    }, 
  }
}

export function fetchFeatures() {
  return dispatch => {
    dispatch(requestFeatures())
    return fetch('/server/features')
      .then(response => response.json())
      .then(features => dispatch(receiveFeatures(features)))
  }
}
