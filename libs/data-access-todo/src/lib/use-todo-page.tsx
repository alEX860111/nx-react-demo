import {
  Loadable,
  Page,
  PageParams,
  pageStateReducer,
} from '@nx-react-demo/util-data-access';
import React, { Reducer, useReducer } from 'react';
import { Todo } from './todo';
import { TodoPageState } from './todo-page-state';
import { TodoPageStateAction } from './todo-page-state-action';
import { useCreateTodo } from './use-create-todo';
import { useDeleteTodo } from './use-delete-todo';
import { useGetTodos } from './use-get-todos';
import { useUpdateTodo } from './use-update-todo';

export function useTodoPage(): [
  Loadable<Page<Todo>>,
  PageParams,
  React.Dispatch<TodoPageStateAction>
] {
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
    filter: {},
  };

  const [state, dispatch] = useReducer(
    pageStateReducer as Reducer<TodoPageState, TodoPageStateAction>,
    initialState
  );

  useUpdateTodo(state, dispatch);
  useGetTodos(state, dispatch);
  useCreateTodo(state, dispatch);
  useDeleteTodo(state, dispatch);

  return [state.loadablePage, state.pageParams, dispatch];
}
