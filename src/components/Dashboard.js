import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tab } from 'semantic-ui-react';
import Question from './Question';

class Dashboard extends Component {
  renderQuestions = questionIds => {
    return questionIds.map(id => (
      <li className="dashboard-list-item" key={id}>
        <Question id={id} />
      </li>
    ));
  };

  render() {
    const { unansweredQuestionIds, answeredQuestionIds } = this.props;

    const panes = [
      {
        menuItem: 'Unanswered Questions',
        render: () => (
          <Tab.Pane>
            <ul>{this.renderQuestions(unansweredQuestionIds)}</ul>
          </Tab.Pane>
        )
      },
      {
        menuItem: 'Answered Questions',
        render: () => (
          <Tab.Pane>
            <ul>{this.renderQuestions(answeredQuestionIds)}</ul>
          </Tab.Pane>
        )
      }
    ];

    return (
      <div className="dashboard-container">
        <Tab menu={{ attached: true, tabular: false }} panes={panes} />
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
