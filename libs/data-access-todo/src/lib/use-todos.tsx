import {
  CrudContainer,
  Loadable,
  loadableReducer,
  Page,
} from '@nx-react-demo/util-data-access';
import { useSnackbar } from 'notistack';
import React, { useEffect, useReducer } from 'react';
import { TodoCreationData } from '..';
import { Todo } from './todo';

const dataFetchReducer = loadableReducer<Todo, TodoCreationData>();

export const useTodos = (): [
  Loadable<Page<Todo>>,
  React.Dispatch<number>,
  React.Dispatch<number>,
  React.Dispatch<TodoCreationData>
] => {
  const { enqueueSnackbar } = useSnackbar();

  const initalState: CrudContainer<Todo, TodoCreationData> = {
    loadablePage: {
      isLoading: false,
      data: {
        index: 0,
        size: 5,
        items: [],
        totalItems: 0,
        totalPages: 0,
      },
    },
  };

  const [state, dispatch] = useReducer(dataFetchReducer, initalState);

  useEffect(() => {
    let didCancel = false;
    const callBackend = async () => {
      if (!state.itemCreationData) return;
      try {
        const result = await fetch('http://localhost:3000/todos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(state.itemCreationData),
        });
        const todo: Todo = await result.json();
        if (!didCancel) {
          enqueueSnackbar('Successfully created todo.', {
            variant: 'success',
          });
          dispatch({ type: 'CREATE_SUCCESS', data: todo });
        }
      } catch (error) {
        console.error(error);
      }
    };
    callBackend();

    return () => {
      didCancel = true;
    };
  }, [state.itemCreationData, enqueueSnackbar]);

  useEffect(() => {
    let didCancel = false;
    const callBackend = async () => {
      dispatch({ type: 'LOAD_INIT' });

      try {
        const result = await fetch(
          `http://localhost:3000/todos?_page=${
            state.loadablePage.data.index + 1
          }&_limit=${state.loadablePage.data.size}&_sort=id&_order=desc`
        );

        const totalItems = Number(result.headers.get('X-Total-Count'));

        const todos: Todo[] = await result.json();
        const page: Page<Todo> = {
          index: state.loadablePage.data.index,
          size: state.loadablePage.data.size,
          items: todos,
          totalItems: totalItems,
          totalPages: Math.ceil(totalItems / state.loadablePage.data.size),
        };

        if (!didCancel) {
          dispatch({ type: 'LOAD_SUCCESS', data: page });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: 'LOAD_ERROR', error });
        }
      }
    };

    callBackend();

    return () => {
      didCancel = true;
    };
  }, [
    state.loadablePage.data.index,
    state.loadablePage.data.size,
    state.createdItem,
  ]);

  const setPageIndex = (pageIndex: number) =>
    dispatch({ type: 'PAGE_INDEX_CHANGE', pageIndex });

  const setPageSize = (pageSize: number) =>
    dispatch({ type: 'PAGE_SIZE_CHANGE', pageSize });

  const setTodoCreationData = (todoCreationData: TodoCreationData) => {
    dispatch({ type: 'CREATE_INIT', data: todoCreationData });
  };
  return [state.loadablePage, setPageIndex, setPageSize, setTodoCreationData];
};
