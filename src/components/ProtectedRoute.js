import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { authedUser } = rest;
  return (
    <Route
      {...rest}
      render={props =>
        authedUser !== null ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { redirectPath: props.location }
            }}
          />
        )
      }
    />
  );
};

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  };
}
export default connect(mapStateToProps)(ProtectedRoute);
