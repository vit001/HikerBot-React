export function setBounds(bounds, center, zoom) {
  return {
    type: 'SET_BOUNDS',
    payload: {bounds, center, zoom}
  }
}