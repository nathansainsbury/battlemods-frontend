import { combineReducers } from 'redux';
import getFunctionData from './getFunctionData';

const rootReducer = combineReducers({
    functionData: getFunctionData
})

export default rootReducer;
