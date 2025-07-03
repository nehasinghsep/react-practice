import {SET_DECREMENT, SET_INCREMENT, RESET_COUNT} from '../constants/counterConstant';

export const increment = () => ({
    type : SET_INCREMENT
})

export const decrement = () => ({
    type : SET_DECREMENT
})

export const resetCount = () => ({
    type : RESET_COUNT
})