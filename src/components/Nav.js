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
    const { authedUser, users } = this.props;
    const user = users[authedUser];

    return (
      <div>
        {authedUser === null ? null : (
          <Menu secondary>
            <Menu.Item as={NavLink} name="home" exact to="/">
              Home
            </Menu.Item>

            <Menu.Item as={NavLink} name="newQuestion" exact to="/add">
              New Question
            </Menu.Item>

            <Menu.Item as={NavLink} name="leaderBoard" exact to="/leaderboard">
              Leader Board
            </Menu.Item>

            <Menu.Menu position="right">
              <Menu.Item>Hello, {user.name}!</Menu.Item>
              <Menu.Item name="logOut" onClick={this.handleLogout}>
                Log Out
              </Menu.Item>
            </Menu.Menu>
          </Menu>
        )}
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users
  };
}

export default withRouter(connect(mapStateToProps)(Nav));
