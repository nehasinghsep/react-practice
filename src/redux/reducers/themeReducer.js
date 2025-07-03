import {SET_THEME_DARK, SET_THEME_LIGHT} from '../constants/themeConstant';

const initialState = {theme : 'light'};

export const themeReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_THEME_LIGHT:
            return {...state, theme:'light'}

        case SET_THEME_DARK:
            return {...state, theme:'dark'}

        default:
            return state;
    }
}