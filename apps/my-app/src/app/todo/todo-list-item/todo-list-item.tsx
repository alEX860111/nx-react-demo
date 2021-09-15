import React from 'react';
import { Todo } from '../todo';

interface Props {
  todo: Todo;
}

export class TodoListItem extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return <li>{this.props.todo.content}</li>;
  }
}
