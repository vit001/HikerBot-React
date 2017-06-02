import * as actions from "../Actions/Actions";

const initialState = {}

export const features = (state = initialState, action) => {
    switch (action.type) {
        case actions.REQUEST_FEATURES:
            return Object.assign({}, state, {
                isFetching: true,
            }) 
        case actions.RECEIVE_FEATURES:
            let mergedFeatures = {};
            action.payload.features.forEach(feature => mergedFeatures[feature.id] = feature);
            return Object.assign({}, state, {
                isFetching: false,
                items: mergedFeatures
            });
        default:
            return state
    }
}
