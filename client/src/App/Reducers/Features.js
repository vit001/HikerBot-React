import * as actions from "../Actions/Actions";

const initialState = {}

export const features = (state = initialState, action) => {
    switch (action.type) {
        case actions.REQUEST_FEATURES:
            return Object.assign({}, state, {
                isFetching: true,
            }) 
        case actions.RECEIVE_FEATURES:
            return {
                isFetching: false,
                items: action.payload.features
            }
        default:
            return state
    }
}
