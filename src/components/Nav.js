import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import { logOut } from '../actions/authedUser';

class Nav extends Component {
  handleLogout = e => {
    e.preventDefault();
    const { history, dispatch } = this.props;
    dispatch(logOut());
    history.push('/login');
  };

  render() {
    const { authedUser } = this.props;
    return (
      <div>
        {authedUser === null ? null : (
          <Menu>
            <Menu.Item as={NavLink} name="home" exact to="/">
              Home
            </Menu.Item>

            <Menu.Item as={NavLink} name="newQuestion" exact to="/add">
              New Question
            </Menu.Item>

            <Menu.Item as={NavLink} name="leaderBoard" exact to="/leaderboard">
              Leader Board
            </Menu.Item>

            <Menu.Item
              name="logOut"
              position="right"
              onClick={this.handleLogout}
            >
              Log Out
            </Menu.Item>
          </Menu>
        )}
      </div>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  };
}

export default withRouter(connect(mapStateToProps)(Nav));
