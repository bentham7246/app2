import React from 'react';
import { Route, Redirect, useHistory } from "react-router-dom";


function PrivateRoute({
    component: Component,
    ...rest
  }) {

    const isAuthenticated = localStorage.getItem('bi_token')

    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated  ? (
                    <Component {...props} key={props.location.key} />
                ) : (
                        <Redirect
                            to={{
                                pathname: '/'
                            }}
                        />
                    )
            }
        />
    );
}

export default PrivateRoute;