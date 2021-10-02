import React from 'react';
import { TodoCreationData } from '../todo-creation-data';
import styles from './todo-input.module.scss';

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
    this.setState({ value: event.target.value.trim() });
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
      <div className={styles.todoInput}>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
            placeholder="What needs to be done?"
          />
        </form>
      </div>
    );
  }
}
