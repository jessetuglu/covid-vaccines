import authAxios from "./authenticatedAxios";
import {updateAction, registrationAction, logoutAction, loginAction} from "../features/user/actions";
import {store} from '../index.js';
export async function updateUser(user){
    let userNew = user;
    authAxios.post("/user/update",user,{withCredentials:true}).then((response)=>{
        console.log(response);
        if (response.data.status == 200){
            userNew = response.data.user;
            store.dispatch(updateAction(userNew));
        }
    }).catch((e)=>{
        console.log(e, "Unable to update user info.");
    });
    return userNew;
}
export async function deleteUser(user){
    authAxios.post("/user/remove",user,{withCredentials:true}).then((response)=>{
        if (response.data.status == 200){
            store.dispatch(logoutAction());
        }
    }).catch((e)=>{
        console.log("Error deleting account.");
    })
}
export async function registerUser(first_name,last_name,email,password,zip,state){
    let response = await authAxios.post("/user/register",{user:{email:email, password:password, first_name:first_name, last_name:last_name, zip:zip, state:state}});
    if (response.data.status === 200){
        console.log("Sending the registered user state to redux", response.data.user);
        store.dispatch(registrationAction(response.data.user));
        return true;
    }
    else{
        return response.data.errors;
    }
}

export async function loginUser(email,password){
    let user = {email:email,password:password}
    let response = await authAxios.post('/user/login',{user});
    if (response.data.status === 200){
        console.log("Sending the user state to redux", response.data.user);
        store.dispatch(loginAction(response.data.user));
        return true;
    }
    else{
        return response.data.errors;
    }
}

export async function logoutUser(){
    let response = await authAxios.delete("/user/logout", {withCredentials: true});
    if (response.data.status === 200){
        store.dispatch(logoutAction());
        return true;
    }
    else{
        return response.data.errors;
    }
}

export async function isAuthenticated(){
    let response = await authAxios.get("/user/logged_in", {withCredentials: true});
    if (response.data.status === 200){
        return response;
    }
    else{
        return false;
    }
}