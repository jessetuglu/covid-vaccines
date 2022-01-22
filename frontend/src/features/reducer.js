import { combineReducers } from 'redux';

import userReducer from './user/reducers.js';

const rootReducer = combineReducers({
	user: userReducer,
});

export default rootReducer;
