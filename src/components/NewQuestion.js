import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card, Input } from 'semantic-ui-react';

class NewQuestion extends Component {
  state = {
    optionOneText: '',
    optionTwoText: ''
  };

  handleChange = (e, data) => {
    const { name, value } = data;
    this.setState(() => ({
      [name]: value
    }));
  };

  render() {
    const { optionOneText, optionTwoText } = this.state;
    console.log('STATEEE:', this.state);
    return (
      <div>
        <Card>
          <Card.Content>
            <Card.Header>Would you rather...</Card.Header>
            <Card.Description>Provide two options.</Card.Description>
            <Input
              placeholder="Option one..."
              name="optionOneText"
              value={optionOneText}
              onChange={this.handleChange}
            />
            <Input
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
              onClick=""
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
