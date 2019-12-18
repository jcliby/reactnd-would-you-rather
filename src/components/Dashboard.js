import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import Question from './Question';

class Dashboard extends Component {
  renderQuestions = questionIds => {
    return questionIds.map(id => (
      <li key={id}>
        <Question id={id} />
      </li>
    ));
  };

  render() {
    const { unansweredQuestionIds, answeredQuestionIds } = this.props;
    return (
      <div>
        <Grid divided="vertically">
          <Grid.Row columns={2}>
            <Grid.Column>
              <ul>{this.renderQuestions(unansweredQuestionIds)}</ul>
            </Grid.Column>
            <Grid.Column>
              <ul>{this.renderQuestions(answeredQuestionIds)}</ul>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, questions }) {
  const unansweredQuestionIds = Object.keys(questions)
    .filter(
      id =>
        !questions[id].optionOne.votes.includes(authedUser) &&
        !questions[id].optionTwo.votes.includes(authedUser)
    )
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp);

  const answeredQuestionIds = Object.keys(questions)
    .filter(
      id =>
        questions[id].optionOne.votes.includes(authedUser) ||
        questions[id].optionTwo.votes.includes(authedUser)
    )
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp);

  return {
    unansweredQuestionIds,
    answeredQuestionIds
  };
}

export default connect(mapStateToProps)(Dashboard);
