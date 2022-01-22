import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../utils/userRequests';

async function getAuth(){
    let res = await isAuthenticated();
    return res;
}

const PrivateRoute = ({ component: Component, ...rest }) => {
    const isAuth = getAuth();
    return (
        <Route
            {...rest}
            render={(props) =>
                isAuth ? <Component {...props} /> : <Redirect to='/login' />
            }
        />
    );
};

export default PrivateRoute;