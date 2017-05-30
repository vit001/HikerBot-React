import * as actions from "../Actions/Actions";

const initialState = {}

export const features = (prevState = initialState, action) => {
    switch (action.type) {
        case actions.REQUEST_FEATURES:
            return prevState
        case actions.RECEIVE_FEATURES:
            return action.payload.features
        default:
            return prevState
    }
}
