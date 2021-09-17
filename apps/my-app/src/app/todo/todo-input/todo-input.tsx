import React from 'react';
import { Todo } from '../todo';
import styles from './todo-input.module.scss';

interface Props {
  handleTodo: (todo: Todo) => void;
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

    const todo: Todo = {
      content: this.state.value,
      id: Math.random(),
    };
    this.props.handleTodo(todo);

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
            placeholder="enter todo"
          />
        </form>
      </div>
    );
  }
}
