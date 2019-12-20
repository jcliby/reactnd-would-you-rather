import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import ProtectedRoute from './ProtectedRoute';
import Dashboard from './Dashboard';
import Leaderboard from './Leaderboard';
import Poll from './Poll';
import NewQuestion from './NewQuestion';
import Login from './Login';
import Nav from './Nav';
import LoadingBar from 'react-redux-loading';

class App extends Component {
  componentDidMount() {
    const { dispatch, loading } = this.props;
    if (loading === true) {
      dispatch(handleInitialData());
    }
  }
  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar
            style={{ backgroundColor: '#b0b0b0', height: '7px' }}
            updateTime={500}
          />
          <div className="container">
            <Nav />
            {this.props.loading === true ? null : (
              <div>
                <Route path="/login" exact component={Login} />
                <ProtectedRoute path="/" exact component={Dashboard} />
                <ProtectedRoute path="/add" exact component={NewQuestion} />
                <ProtectedRoute path="/question/:id" exact component={Poll} />
                <ProtectedRoute
                  path="/leaderboard"
                  exact
                  component={Leaderboard}
                />
              </div>
            )}
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ users }) {
  let loading = true;
  if (Object.keys(users).length > 0) {
    loading = false;
  }

  return {
    loading: loading
  };
}

export default connect(mapStateToProps)(App);
