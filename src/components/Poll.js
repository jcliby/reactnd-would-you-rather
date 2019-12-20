import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { handleAddAnswer } from '../actions/questions';
import {
  Button,
  Card,
  Image,
  Radio,
  Message,
  Progress
} from 'semantic-ui-react';
import NoMatch from './NoMatch';

class Poll extends Component {
  state = {
    value: ''
  };

  handleChange = (e, data) => {
    this.setState(() => ({
      value: data.value
    }));
  };

  handleSubmit = e => {
    e.preventDefault();
    const { value } = this.state;
    const { dispatch, authedUser, id } = this.props;
    dispatch(
      handleAddAnswer({
        authedUser,
        qid: id,
        answer: value
      })
    );
    this.setState(() => ({
      value: ''
    }));
  };

  render() {
    const { authedUser, question, author, answer, redirect } = this.props;
    const { value } = this.state;

    if (redirect === true) {
      return <NoMatch />;
    }

    const optionOneVotes = question.optionOne.votes.length;
    const optionTwoVotes = question.optionTwo.votes.length;
    const totalVotes = optionOneVotes + optionTwoVotes;

    return (
      <div className="poll-container">
        {answer === null ? (
          <div>
            <Card>
              <Card.Content>
                <Image
                  floated="right"
                  size="mini"
                  circular
                  src={author.avatarURL}
                />
                <Card.Header>Would you rather...</Card.Header>
                <Card.Meta>
                  Created by {author.id === authedUser ? 'You' : author.name}
                </Card.Meta>
                <Card.Description>
                  <Radio
                    className="question-radio"
                    label={question.optionOne.text}
                    value="optionOne"
                    checked={this.state.value === 'optionOne'}
                    onChange={this.handleChange}
                  />
                  <Radio
                    className="question-radio"
                    label={question.optionTwo.text}
                    value="optionTwo"
                    checked={this.state.value === 'optionTwo'}
                    onChange={this.handleChange}
                  />
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Button
                  fluid
                  basic
                  onClick={this.handleSubmit}
                  disabled={value === ''}
                >
                  Submit Answer
                </Button>
              </Card.Content>
            </Card>
          </div>
        ) : (
          <div>
            <Card>
              <Card.Content>
                <Image
                  floated="right"
                  size="mini"
                  circular
                  src={author.avatarURL}
                />
                <Card.Header>Would you rather...</Card.Header>
                <Card.Meta>
                  Created by {author.id === authedUser ? 'You' : author.name}
                </Card.Meta>
                <Card.Description>
                  <div className="poll-stats">
                    <Message color={answer === 'optionOne' ? 'green' : 'grey'}>
                      <Message.Header>{question.optionOne.text}</Message.Header>
                      <p>{`${optionOneVotes} out of ${totalVotes} votes`}</p>
                      <Progress
                        percent={Math.round(
                          (optionOneVotes / totalVotes) * 100
                        )}
                        progress
                      />
                    </Message>
                  </div>
                  <div className="poll-stats">
                    <Message color={answer === 'optionTwo' ? 'green' : 'grey'}>
                      <Message.Header>{question.optionTwo.text}</Message.Header>
                      <p>{`${optionTwoVotes} out of ${totalVotes} votes`}</p>
                      <Progress
                        percent={Math.round(
                          (optionTwoVotes / totalVotes) * 100
                        )}
                        progress
                      />
                    </Message>
                  </div>
                </Card.Description>
              </Card.Content>
            </Card>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps({ authedUser, questions, users }, props) {
  const id = props.match.params.question_id;

  let redirect = false;
  if (questions[id] === undefined) {
    redirect = true;
    return {
      redirect
    };
  }

  const question = questions[id];
  const author = users[question.author];
  let answer = null;

  if (question.optionOne.votes.includes(authedUser)) {
    answer = 'optionOne';
  }

  if (question.optionTwo.votes.includes(authedUser)) {
    answer = 'optionTwo';
  }

  return {
    id,
    authedUser,
    question,
    author,
    answer,
    redirect
  };
}

export default withRouter(connect(mapStateToProps)(Poll));
