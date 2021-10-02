import React from 'react';
import { Todo } from '../todo';
import { TodoListItem } from '../todo-list-item/todo-list-item';

interface Props {
  todoList: Todo[];
  handleDeleteTodo: (todo: Todo) => void;
}

// eslint-disable-next-line
interface State {}

export class TodoList extends React.Component<Props, State> {
  render() {
    return (
      <ul className="list-group">
        {this.props.todoList.map((todo) => (
          <TodoListItem
            key={todo.id}
            todo={todo}
            handleDeleteTodo={this.props.handleDeleteTodo}
          ></TodoListItem>
        ))}
      </ul>
    );
  }
}
