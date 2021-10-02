import React from 'react';
import { Todo } from '../todo';

interface Props {
  todo: Todo;
  handleDeleteTodo: (todo: Todo) => void;
}

// eslint-disable-next-line
interface State {}

export class TodoListItem extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  private handleClick() {
    this.props.handleDeleteTodo(this.props.todo);
  }

  render() {
    return (
      <li className="list-group-item">
        <div className="d-flex justify-content-between align-items-center">
          <span>{this.props.todo.content}</span>
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={this.handleClick}
          >
            X
          </button>
        </div>
      </li>
    );
  }
}
