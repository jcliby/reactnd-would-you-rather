import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import Dashboard from './Dashboard';
import Leaderboard from './Leaderboard';
import Poll from './Poll';
import NewQuestion from './NewQuestion';
import Login from './Login';
import Nav from './Nav';
import LoadingBar from 'react-redux-loading';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
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
                <Route path="/" exact component={Dashboard} />
                <Route path="/add" exact component={NewQuestion} />
                <Route path="/question/:id" exact component={Poll} />
                <Route path="/leaderboard" exact component={Leaderboard} />
              </div>
            )}
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === true
  };
}

export default connect(mapStateToProps)(App);
