import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

class Nav extends Component {
  state = {};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu>
        <Menu.Item
          as={NavLink}
          name="home"
          active={activeItem === 'home'}
          onClick={this.handleItemClick}
          exact
          to="/"
        >
          Home
        </Menu.Item>

        <Menu.Item
          as={NavLink}
          name="newQuestion"
          active={activeItem === 'newQuestion'}
          onClick={this.handleItemClick}
          exact
          to="/add"
        >
          New Question
        </Menu.Item>

        <Menu.Item
          as={NavLink}
          name="leaderBoard"
          active={activeItem === 'leaderBoard'}
          onClick={this.handleItemClick}
          exact
          to="/leaderboard"
        >
          Leader Board
        </Menu.Item>

        <Menu.Item
          as={NavLink}
          name="logOut"
          active={activeItem === 'logOut'}
          onClick={this.handleItemClick}
          position="right"
          exact
          to="/login"
        >
          Log Out
        </Menu.Item>
      </Menu>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  };
}

export default connect(mapStateToProps)(Nav);
