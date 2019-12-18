import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleAddAnswer } from '../actions/questions';
import { Button, Card, Image, Radio } from 'semantic-ui-react';

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
    const { authedUser, question, author } = this.props;
    return (
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
                value={'optionOne'}
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
              Submit
            </Button>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, questions, users }, { id }) {
  const question = questions[id];
  const author = users[question.author];
  return {
    authedUser,
    question,
    author
  };
}

export default connect(mapStateToProps)(Poll);
