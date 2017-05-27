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

export function fetchFeatures(bounds = 'asd', zoom = 12) {
  return dispatch => {
    dispatch(requestFeatures(bounds, zoom))

    const body = JSON.stringify({bounds, zoom});
    return fetch('/server/points/getPointsAndTracks', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body
    })
      .then(response => response.json())
      .then(features => dispatch(receiveFeatures(features)))
  }
}
