import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card, Input } from 'semantic-ui-react';
import { handleAddQuestion } from '../actions/questions';
import { Redirect } from 'react-router-dom';

class NewQuestion extends Component {
  state = {
    optionOneText: '',
    optionTwoText: '',
    toHome: false
  };

  handleChange = (e, data) => {
    const { name, value } = data;
    this.setState(() => ({
      [name]: value
    }));
  };

  handleSubmit = e => {
    e.preventDefault();
    const { optionOneText, optionTwoText } = this.state;
    const { dispatch, authedUser } = this.props;
    dispatch(handleAddQuestion({ optionOneText, optionTwoText, authedUser }));

    this.setState(() => ({
      optionOneText: '',
      optionTwoText: '',
      toHome: true
    }));
  };

  render() {
    const { optionOneText, optionTwoText, toHome } = this.state;

    if (toHome === true) {
      return <Redirect to="/" />;
    }

    return (
      <div className="new-question-container">
        <Card>
          <Card.Content>
            <Card.Header>Would you rather...</Card.Header>
            <Card.Description>Provide two options.</Card.Description>
            <Input
              className="new-question-input"
              placeholder="Option one..."
              name="optionOneText"
              value={optionOneText}
              onChange={this.handleChange}
            />
            <Input
              className="new-question-input"
              placeholder="Option two..."
              name="optionTwoText"
              value={optionTwoText}
              onChange={this.handleChange}
            />
          </Card.Content>
          <Card.Content extra>
            <Button
              fluid
              basic
              onClick={this.handleSubmit}
              disabled={optionOneText === '' || optionTwoText === ''}
            >
              Submit Question
            </Button>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return { authedUser };
}

export default connect(mapStateToProps)(NewQuestion);
