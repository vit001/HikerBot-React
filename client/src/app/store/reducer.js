import {combineReducers} from 'redux';
import mapReducer from '../../map/store/reducer'

const initialState = {

};

function reducer(state = initialState, {type}) {
  switch (type) {
    default:
      return state
  }
}

export default combineReducers({
  reducer,
  map: mapReducer
})
