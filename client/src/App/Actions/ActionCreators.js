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

export function fetchFeatures(bounds, zoom) {
  console.log(`fetchFeatures: ${bounds}`);
  return dispatch => {
    dispatch(requestFeatures(bounds, zoom))
    const {south, west, north, east} = bounds.toJSON();
    return fetch(`/server/features/bounds/${south}/${west}/${north}/${east}/zoom/${zoom}`)
      .then(response => response.json())
      .then(features => dispatch(receiveFeatures(features)))
  }
}
