import {SET_DECREMENT, SET_INCREMENT, RESET_COUNT} from '../constants/counterConstant';

const initialState = {count : 0};

export const counterReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_INCREMENT:
            return {...state, count:state.count + 1}
        case SET_DECREMENT:
            return {...state, count:state.count - 1}
        case RESET_COUNT:
            return {...state, count : 0}
        default:
            return state;
    }
}