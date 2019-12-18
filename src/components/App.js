import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import Dashboard from './Dashboard';
import Leaderboard from './Leaderboard';
import Poll from './Poll';
import LoadingBar from 'react-redux-loading';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    return (
      <div>
        <LoadingBar
          style={{ backgroundColor: '#b0b0b0', height: '7px' }}
          updateTime={500}
        />
        {this.props.loading === true ? null : (
          <Poll id={'8xf0y6ziyjabvozdd253nd'} />
        )}
      </div>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null
  };
}

export default connect(mapStateToProps)(App);
