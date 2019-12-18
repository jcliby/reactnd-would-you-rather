import React, { Component } from 'react';
import { connect } from 'react-redux';
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
      <div>
        <ul>{this.renderUser(userInfos)}</ul>
      </div>
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
