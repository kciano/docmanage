import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuth } from './Helper'

const AdminRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) =>
            isAuth() && isAuth().role === 'admin' ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: '/signin',
                        state: { from: props.location }
                    }}
                />
            )   
        }
    />
);




export default AdminRoute;