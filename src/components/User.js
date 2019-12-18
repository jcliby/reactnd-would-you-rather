import React from 'react';
import { Card, Image } from 'semantic-ui-react';

export default function User(props) {
  const {
    name,
    avatarURL,
    questionsAnswered,
    createdQuestions,
    rank
  } = props.user;

  return (
    <div>
      <Card>
        <Card.Content>
          <Image floated="right" size="mini" circular src={avatarURL} />
          <Card.Header>{name}</Card.Header>
          <Card.Meta>Score: {rank}</Card.Meta>
          <Card.Description>{`Answered: ${questionsAnswered}`}</Card.Description>
          <Card.Description>{`Created: ${createdQuestions}`}</Card.Description>
        </Card.Content>
      </Card>
    </div>
  );
}
