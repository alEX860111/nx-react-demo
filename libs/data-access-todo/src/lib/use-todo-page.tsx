import {
  Loadable,
  Page,
  PageParams,
  PageState,
  PageStateAction,
  pageStateReducer,
} from '@nx-react-demo/util-data-access';
import { useSnackbar } from 'notistack';
import React, { Reducer, useEffect, useReducer } from 'react';
import { Todo } from './todo';
import { TodoCreationData } from './todo-creation-data';

type TodoPageState = PageState<Todo, number, TodoCreationData>;
export type TodoPageStateAction = PageStateAction<
  Todo,
  number,
  TodoCreationData
>;

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
  };

  const [state, dispatch] = useReducer(
    pageStateReducer as Reducer<TodoPageState, TodoPageStateAction>,
    initialState
  );

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    let didCancel = false;

    async function updateTodo() {
      if (!state.itemUpdateData) return;

      try {
        const result = await fetch(
          `http://localhost:3000/todos/${state.itemUpdateData.id}`,
          {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(state.itemUpdateData),
          }
        );

        if (result.status !== 200) throw new Error();
      } catch (error) {
        const errorMessage = 'Failed to update todo';
        enqueueSnackbar(errorMessage, {
          variant: 'error',
        });
        if (!didCancel) {
          dispatch({ type: 'REFRESH_PAGE' });
        }
      }
    }

    updateTodo();

    return () => {
      didCancel = true;
    };
  }, [state.itemUpdateData, enqueueSnackbar]);

  useEffect(() => {
    let didCancel = false;

    async function createTodo() {
      if (!state.itemCreationData) return;

      try {
        const result = await fetch('http://localhost:3000/todos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(state.itemCreationData),
        });

        if (result.status !== 201) throw new Error();

        if (!didCancel) {
          enqueueSnackbar('Successfully created todo.', {
            variant: 'success',
          });
          dispatch({ type: 'ITEM_CREATION_SUCCESS' });
        }
      } catch (error) {
        const errorMessage = 'Failed to create todo';
        enqueueSnackbar(errorMessage, { variant: 'error' });
      }
    }

    createTodo();

    return () => {
      didCancel = true;
    };
  }, [state.itemCreationData, enqueueSnackbar]);

  useEffect(() => {
    let didCancel = false;

    async function getTodos() {
      dispatch({ type: 'LOAD_INIT' });

      try {
        const result = await fetch(
          `http://localhost:3000/todos?_page=${
            state.pageParams.index + 1
          }&_limit=${state.pageParams.size}&_sort=id&_order=desc`
        );

        if (result.status !== 200) throw new Error();

        const totalItems = Number(result.headers.get('X-Total-Count'));

        const todos: Todo[] = await result.json();
        const page: Page<Todo> = {
          items: todos,
          totalItems: totalItems,
          totalPages: Math.ceil(totalItems / state.pageParams.size),
        };

        if (!didCancel) {
          dispatch({ type: 'LOAD_SUCCESS', page });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({
            type: 'LOAD_ERROR',
            error: 'failed to load todos',
          });
          const errorMessage = 'Failed to load todos';
          enqueueSnackbar(errorMessage, {
            variant: 'error',
          });
        }
      }
    }

    getTodos();

    return () => {
      didCancel = true;
    };
  }, [
    state.pageParams.index,
    state.pageParams.size,
    state.refreshPage,
    enqueueSnackbar,
  ]);

  useEffect(() => {
    let didCancel = false;

    async function deleteTodo() {
      if (state.itemIdToDelete === undefined) return;

      try {
        const result = await fetch(
          `http://localhost:3000/todos/${state.itemIdToDelete}`,
          { method: 'DELETE' }
        );

        if (result.status !== 200) throw new Error();

        if (!didCancel) {
          enqueueSnackbar('Successfully deleted todo.', {
            variant: 'success',
          });
          dispatch({ type: 'ITEM_DELETION_SUCCESS' });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: 'ITEM_DELETION_ERROR' });
          const errorMessage = 'Failed to delete todo';
          enqueueSnackbar(errorMessage, {
            variant: 'error',
          });
        }
      }
    }

    deleteTodo();

    return () => {
      didCancel = true;
    };
  }, [state.itemIdToDelete, enqueueSnackbar]);

  return [state.loadablePage, state.pageParams, dispatch];
}
