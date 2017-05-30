import * as actions from "../Actions/Actions";

const initialState = {}

export const features = (prevState = initialState, action) => {
    switch (action.type) {
        case actions.REQUEST_FEATURES:
            return prevState
        case actions.RECEIVE_FEATURES:
            let trFeatures = {};
            action.payload.features.forEach(feature => trFeatures[feature.id] = feature);
            return Object.assign({}, prevState, trFeatures);
        default:
            return prevState
    }
}
