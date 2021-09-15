import React from 'react';
import { Todo } from '../todo';
import { TodoListItem } from '../todo-list-item/todo-list-item';

interface Props {
  todoList: Todo[];
}

export class TodoList extends React.Component<Props, unknown> {
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
