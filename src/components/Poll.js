import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleAddAnswer } from '../actions/questions';
import { Button, Card, Image, Radio, Message } from 'semantic-ui-react';

class Poll extends Component {
  state = {
    value: ''
  };

  handleChange = (e, { value }) => {
    this.setState(() => ({
      value
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
  };

  render() {
    const { authedUser, question, author, answer } = this.props;

    const optionOneVotes = question.optionOne.votes.length;
    const optionTwoVotes = question.optionTwo.votes.length;
    const totalVotes = optionOneVotes + optionTwoVotes;

    return (
      <div>
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
                    label={question.optionOne.text}
                    value="optionOne"
                    checked={this.state.value === 'optionOne'}
                    onChange={this.handleChange}
                  />
                  <Radio
                    label={question.optionTwo.text}
                    value="optionTwo"
                    checked={this.state.value === 'optionTwo'}
                    onChange={this.handleChange}
                  />
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Button fluid basic onClick={this.handleSubmit}>
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
                  <Message color={answer === 'optionOne' ? 'green' : 'grey'}>
                    <Message.Header>{question.optionOne.text}</Message.Header>
                    <p>{`${optionOneVotes} out of ${totalVotes} votes`}</p>
                  </Message>
                  <Message color={answer === 'optionTwo' ? 'green' : 'grey'}>
                    <Message.Header>{question.optionTwo.text}</Message.Header>
                    <p>{`${optionTwoVotes} out of ${totalVotes} votes`}</p>
                  </Message>
                </Card.Description>
              </Card.Content>
            </Card>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps({ authedUser, questions, users }, { id }) {
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
    authedUser,
    question,
    author,
    answer
  };
}

export default connect(mapStateToProps)(Poll);
