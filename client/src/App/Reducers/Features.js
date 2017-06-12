import * as actions from "../Actions/Actions";

const initialState = {}

export const features = (state = initialState, action) => {
    switch (action.type) {
        case actions.REQUEST_FEATURES:
            return Object.assign({}, state, {
                isFetching: true,
            }) 
        case actions.RECEIVE_FEATURES:
            return Object.assign({}, state, {
                isFetching: false,
                items: Object.assign({}, ...action.payload.features.map((feature) => ({ [feature.id]: feature })))
            });
        default:
            return state
    }
}
