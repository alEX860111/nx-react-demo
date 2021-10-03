import TextField from '@mui/material/TextField';
import React from 'react';
import { TodoCreationData } from '../todo-creation-data';

interface Props {
  handleTodoCreationData: (todoCreationData: TodoCreationData) => void;
}

interface State {
  value: string;
}

export class TodoInput extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  private handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ value: event.target.value });
  }

  private handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (this.state.value.length === 0) {
      return;
    }

    const todoCreationData: TodoCreationData = {
      content: this.state.value,
    };
    this.props.handleTodoCreationData(todoCreationData);

    this.setState({ value: '' });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <TextField
          data-testid="textfield"
          fullWidth
          autoFocus
          label="What needs to be done?"
          value={this.state.value}
          onChange={this.handleChange}
        />
      </form>
    );
  }
}
