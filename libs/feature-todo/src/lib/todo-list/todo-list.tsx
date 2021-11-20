import List from '@mui/material/List';
import { Todo, TodoStateFilter } from '@nx-react-demo/data-access-todo';
import React from 'react';
import { TodoListItem } from '../todo-list-item/todo-list-item';

interface Props {
  todos: Todo[];
  filter: TodoStateFilter;
}

export function TodoList(props: Props) {
  return (
    <List>
      {props.todos.map((todo) => (
        <TodoListItem key={todo.id} todo={todo} filter={props.filter} />
      ))}
    </List>
  );
}
