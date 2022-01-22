import { LOGIN_USER, LOGOUT_USER, REGISTER_USER, UPDATE_USER } from '../actionTypes';

export const loginAction = (user) => {
	console.log("CREATING LOGIN ACTION FOR USER", user);
	return { type: LOGIN_USER, payload: {user:user} };
};
export const logoutAction = () => {
	return { type: LOGOUT_USER, payload: {} };
};
export const registrationAction = (user) => {
	return { type: REGISTER_USER, payload: {user:user} };
};
export const updateAction = (user) => {
	console.log("RECEIEVED FOR PAYLOAD", user);
	return { type: UPDATE_USER, payload: {user:user} };
};
