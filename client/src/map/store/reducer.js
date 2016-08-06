const initialState = {
  coords: {
    lat: 51.5258541,
    lng: -0.08040660000006028
  }
};

function reducer(state = initialState, {type, payload}) {
  switch (type) {
    case 'GET_POSITION_FULFILLED':
      return {
        ...state,
        coords: {
          lat: payload.latitude,
          lng: payload.longitude
        }
      };
    case 'GET_POINTS_FULFILLED':
      return {
        ...state,
        geoJson: payload
      };
    case 'GET_POSITION_PENDING':
    case 'GET_POSITION_REJECTED':
    default:
      return state
  }
}


export default reducer;
