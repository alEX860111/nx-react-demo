import {
  Page,
  PageState,
  PageStateAction,
  pageStateReducer,
} from '@nx-react-demo/util-data-access';
import React, { Reducer, useCallback, useEffect, useReducer } from 'react';
import { Todo } from './todo';

export const useGetTodoPage = (): [
  PageState<Todo>,
  React.Dispatch<number>,
  React.Dispatch<number>,
  React.Dispatch<void>,
  React.Dispatch<void>
] => {
  const initialState: PageState<Todo> = {
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
  };

  const [state, dispatch] = useReducer(
    pageStateReducer as Reducer<PageState<Todo>, PageStateAction<Todo>>,
    initialState
  );

  useEffect(() => {
    let didCancel = false;
    const callBackend = async () => {
      dispatch({ type: 'LOAD_INIT' });

      try {
        const result = await fetch(
          `http://localhost:3000/todos?_page=${
            state.pageParams.index + 1
          }&_limit=${state.pageParams.size}&_sort=id&_order=desc`
        );

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
        }
      }
    };

    callBackend();

    return () => {
      didCancel = true;
    };
  }, [state.pageParams]);

  const setPageIndex = useCallback(
    (pageIndex: number) => dispatch({ type: 'PAGE_INDEX_CHANGE', pageIndex }),
    []
  );

  const setPageSize = useCallback(
    (pageSize: number) => dispatch({ type: 'PAGE_SIZE_CHANGE', pageSize }),
    []
  );

  const handleTodoCreated = useCallback(
    () => dispatch({ type: 'ITEM_CREATED' }),
    []
  );

  const handleTodoDeleted = useCallback(
    () => dispatch({ type: 'ITEM_DELETED' }),
    []
  );

  return [
    state,
    setPageIndex,
    setPageSize,
    handleTodoCreated,
    handleTodoDeleted,
  ];
};
