import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';

class Dashboard extends Component {
  renderQuestions = questionKeys => {
    return questionKeys.map(key => (
      <li key={key}>
        <div>Q ID: {key}</div>
      </li>
    ));
  };

  render() {
    const { unansweredQuestionKeys, answeredQuestionKeys } = this.props;
    return (
      <div>
        <Grid divided="vertically">
          <Grid.Row columns={2}>
            <Grid.Column>
              <ul>{this.renderQuestions(unansweredQuestionKeys)}</ul>
            </Grid.Column>
            <Grid.Column>
              <ul>{this.renderQuestions(answeredQuestionKeys)}</ul>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, questions }) {
  const unansweredQuestionKeys = Object.keys(questions)
    .filter(
      key =>
        !questions[key].optionOne.votes.includes(authedUser) &&
        !questions[key].optionTwo.votes.includes(authedUser)
    )
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp);

  const answeredQuestionKeys = Object.keys(questions)
    .filter(
      key =>
        questions[key].optionOne.votes.includes(authedUser) ||
        questions[key].optionTwo.votes.includes(authedUser)
    )
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp);

  return {
    unansweredQuestionKeys,
    answeredQuestionKeys
  };
}

export default connect(mapStateToProps)(Dashboard);
