import * as api from '../../api/hikerBotServices';

export function getCurrentPosition() {
  return {
    type: 'GET_POSITION',
    payload: api.getCurrentPosition()
  }
}

export function getPoints() {
  return {
    type: 'GET_POINTS',
    payload: api.getPoints()
  }
}
