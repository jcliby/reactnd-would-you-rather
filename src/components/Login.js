import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';
import { Button, Card, Dropdown } from 'semantic-ui-react';

class Login extends Component {
  state = {
    selectedUserId: ''
  };

  handleChange = (e, data) => {
    this.setState(() => ({
      selectedUserId: data.value
    }));
  };

  handleSubmit = e => {
    e.preventDefault();
    const { selectedUserId } = this.state;
    const { dispatch } = this.props;
    dispatch(setAuthedUser(selectedUserId));
  };

  render() {
    const { userSelections } = this.props;

    return (
      <div>
        <Card>
          <Card.Content>
            <Card.Header>Login</Card.Header>
            <Dropdown
              placeholder="Select a user"
              fluid
              selection
              options={userSelections}
              onChange={this.handleChange}
            />
          </Card.Content>
          <Card.Content extra>
            <Button fluid basic onClick={this.handleSubmit}>
              Submit
            </Button>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  const userSelections = Object.keys(users).map(user => {
    const userDetails = {
      text: users[user].name,
      value: users[user].id,
      image: { avatar: true, src: users[user].avatarURL }
    };
    return userDetails;
  });
  return { userSelections };
}

export default connect(mapStateToProps)(Login);
