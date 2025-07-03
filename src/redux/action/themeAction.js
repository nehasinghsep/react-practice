import {SET_THEME_DARK, SET_THEME_LIGHT} from '../constants/themeConstant';

export const changeThemeLight = () =>  ({
    type : SET_THEME_LIGHT
})

export const changeThemeDark = () =>  ({
    type : SET_THEME_DARK
})