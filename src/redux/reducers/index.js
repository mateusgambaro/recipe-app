import { combineReducers } from 'redux';
import header from './HeaderReducer';
import profileReducer from './profileReducer';
import searchReducer from './searchReducer';

const rootReducer = combineReducers({ header, profileReducer, searchReducer });

export default rootReducer;
