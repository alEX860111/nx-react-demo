import React from 'react';
import { Todo } from '../todo';

interface Props {
  todo: Todo;
}

// eslint-disable-next-line
interface State {}

export class TodoListItem extends React.Component<Props, State> {
  render() {
    return (
      <li className="list-group-item">
        <div className="d-flex justify-content-between align-items-center">
          <span>{this.props.todo.content}</span>
          <button type="button" className="btn btn-danger btn-sm">
            X
          </button>
        </div>
      </li>
    );
  }
}
