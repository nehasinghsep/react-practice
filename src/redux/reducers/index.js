import { combineReducers } from 'redux';
import {counterReducer} from './counterReducer';
import {themeReducer} from './themeReducer';
import {cartReducer} from './cartReducer';

export const rootReducer = combineReducers({
    counterReducer,
    themeReducer,
    cartReducer
})