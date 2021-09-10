import React from 'react';
import { TodoListItem } from '../todo-list-item/todo-list-item';
import { Todo } from '../todo/todo';

interface Props {
  todoList: Todo[];
}

export class TodoList extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <ul>
        {this.props.todoList.map((todo) => (
          <TodoListItem key={todo.id} todo={todo}></TodoListItem>
        ))}
      </ul>
    );
  }
}
