import List from '@mui/material/List';
import { Todo } from '@nx-react-demo/data-access-todo';
import React from 'react';
import { TodoListItem } from '../todo-list-item/todo-list-item';

interface Props {
  todos: Todo[];
}

export function TodoList(props: Props) {
  return (
    <List>
      {props.todos.map((todo) => (
        <TodoListItem key={todo.id} todo={todo} />
      ))}
    </List>
  );
}
