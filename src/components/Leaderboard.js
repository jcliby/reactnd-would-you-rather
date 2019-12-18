import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import User from './User';

class Leaderboard extends Component {
  renderUser = users => {
    return users.map(user => (
      <li key={user.id}>
        <User user={user} />
      </li>
    ));
  };

  render() {
    const { userInfos } = this.props;
    return (
      <Grid centered columns={3}>
        <Grid.Column>
          <ul>{this.renderUser(userInfos)}</ul>
        </Grid.Column>
      </Grid>
    );
  }
}

function mapStateToProps({ users }) {
  const userInfos = Object.keys(users)
    .map(user => {
      const userDetails = {
        id: users[user].id,
        name: users[user].name,
        avatarURL: users[user].avatarURL,
        questionsAnswered: Object.keys(users[user].answers).length,
        createdQuestions: users[user].questions.length
      };
      const rank = userDetails.questionsAnswered + userDetails.createdQuestions;
      userDetails.rank = rank;
      return userDetails;
    })
    .sort((a, b) => b.rank - a.rank);
  return {
    userInfos
  };
}

export default connect(mapStateToProps)(Leaderboard);
