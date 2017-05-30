import fetch from "isomorphic-fetch";
import * as actions from "../Actions/Actions";

function requestFeatures(bounds, zoom) {
  return {
    type: actions.REQUEST_FEATURES,
    payload: {
      bounds,
      zoom,
    },
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

export function fetchFeatures(bounds = {south: 4.095870312146702, west: -136.3232421875, north: 53.469301532231576, east: -83.6767578125}, zoom = 5) {
  return dispatch => {
    dispatch(requestFeatures(bounds, zoom))
    return fetch('/server/features')
      .then(response => response.json())
      .then(features => dispatch(receiveFeatures(features)))
  }
}
