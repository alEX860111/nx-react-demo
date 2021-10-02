import React from 'react';
import { Todo } from '../todo';

interface Props {
  todo: Todo;
}

// eslint-disable-next-line
interface State {}

export class TodoListItem extends React.Component<Props, State> {
  render() {
    return <li className="list-group-item">{this.props.todo.content}</li>;
  }
}
