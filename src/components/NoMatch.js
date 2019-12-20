import React from 'react';
import { withRouter } from 'react-router-dom';

const NoMatch = ({ location }) => {
  return (
    <div className="no-match-container">
      <h1>404</h1>
      <h4>
        No match for <code>{location.pathname}</code>
      </h4>
    </div>
  );
};

export default withRouter(NoMatch);
