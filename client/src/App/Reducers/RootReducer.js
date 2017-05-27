import { combineReducers } from 'redux';
import { features } from "./Features"

const rootReducer = combineReducers({
  features,
});

export default rootReducer;