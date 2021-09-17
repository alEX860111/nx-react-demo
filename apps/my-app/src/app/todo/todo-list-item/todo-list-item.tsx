import React from 'react';
import { Todo } from '../todo';

interface Props {
  todo: Todo;
}

export class TodoListItem extends React.Component<Props, unknown> {
  render() {
    return <li>{this.props.todo.content}</li>;
  }
}
