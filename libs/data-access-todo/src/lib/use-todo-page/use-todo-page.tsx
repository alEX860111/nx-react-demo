import React, { useReducer } from 'react';
import { TodoPageState } from '../todo-page-state';
import { TodoPageStateAction } from '../todo-page-state-action';
import { todoPageStateReducer } from '../todo-page-state-reducer';
import { TodoStateFilter } from '../todo-state-filter';
import { useCreateTodo } from '../use-create-todo/use-create-todo';
import { useDeleteTodo } from '../use-delete-todo/use-delete-todo';
import { useGetTodos } from '../use-get-todos/use-get-todos';
import { useUpdateTodo } from '../use-update-todo/use-update-todo';

export function useTodoPage(
  filter: TodoStateFilter = 'all'
): [TodoPageState, React.Dispatch<TodoPageStateAction>] {
  const initialState: TodoPageState = {
    loadablePage: {
      isLoading: false,
      data: {
        items: [],
        totalItems: 0,
        totalPages: 0,
      },
    },
    pageParams: {
      index: 0,
      size: 5,
    },
    refreshPage: 0,
    filter,
  };

  const [state, dispatch] = useReducer(todoPageStateReducer, initialState);

  useUpdateTodo(state, dispatch);
  useGetTodos(state, dispatch);
  useCreateTodo(state, dispatch);
  useDeleteTodo(state, dispatch);

  return [state, dispatch];
}
