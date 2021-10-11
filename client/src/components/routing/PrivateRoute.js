import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';


const PrivateRoute = ({ component: Component, ...rest }) => {

 useEffect(()=>{
  
 })
 const token = localStorage.getItem('token');
  return (
    <Route
      {...rest}
      render={props =>
        (token==null) ? (
          <Redirect to='/login' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;