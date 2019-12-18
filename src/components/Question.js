import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card, Image } from 'semantic-ui-react';

class Question extends Component {
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
            <Card.Description>{`...${question.optionOne.text}`}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Button fluid basic>
              View Poll
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

export default connect(mapStateToProps)(Question);
