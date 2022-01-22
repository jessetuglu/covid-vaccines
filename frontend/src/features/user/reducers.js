import { LOGIN_USER, LOGOUT_USER, REGISTER_USER,UPDATE_USER } from '../actionTypes';
import {logoutUser} from "../../utils/userRequests";
const initialState = {};

export default function userReducer(state = initialState, action) {
	console.log("REDUCER ACTION PAYLOAD: ", action.payload);
	switch (action.type) {
		case LOGIN_USER: {
			console.log("LOGIN REDUCER UPDATING STATE", {user:action.payload.user});
			return {user:action.payload.user};
		}
		case LOGOUT_USER: {
			console.log("LOGOUT REDUCER UPDATING STATE");
			return { user:null };
		}
		case REGISTER_USER: {
			console.log("REGISTER REDUCER UPDATING STATE", {user:action.payload.user});
			return  {user:action.payload.user};
		}
		case UPDATE_USER: {
			console.log("UPDATE REDUCER UPDATING STATE", {user:action.payload.user});
			return  {user:action.payload.user};
		}
		default:
			return state;
	}
}
