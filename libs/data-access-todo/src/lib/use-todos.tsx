import {
  isLoadErrorAction,
  isLoadInitAction,
  isLoadSuccessAction,
  Loadable,
  LoadAction,
  LoadErrorAction,
  LoadInitAction,
  LoadSuccessAction
} from '@nx-react-demo/util-data-access';
import React, { Reducer, useEffect, useReducer, useState } from 'react';
import { Page } from './page';
import { Todo } from './todo';

const dataFetchReducer: Reducer<Loadable<Page<Todo>>, LoadAction> = (
  state: Loadable<Page<Todo>>,
  action: LoadAction
) => {
  if (isLoadInitAction(action)) {
    return { ...state, isLoading: true, error: false };
  } else if (isLoadSuccessAction<Page<Todo>>(action)) {
    return {
      ...state,
      isLoading: false,
      error: false,
      data: action.data,
    };
  } else if (isLoadErrorAction(action)) {
    return {
      ...state,
      isLoading: false,
      error: action.error,
    };
  }
  throw new Error();
};

export const useTodos = (): [
  Loadable<Page<Todo>>,
  React.Dispatch<React.SetStateAction<number>>,
  React.Dispatch<React.SetStateAction<number>>
] => {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(2);

  const initalState: Loadable<Page<Todo>> = {
    isLoading: false,
    data: {
      index: 0,
      size: 10,
      items: [],
      totalItems: 0,
      totalPages: 0,
    },
  };

  const [state, dispatch] = useReducer(dataFetchReducer, initalState);

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      const action: LoadInitAction = {
        type: 'LOAD_INIT',
      };
      dispatch(action);

      try {
        const result = await fetch(
          `http://localhost:3000/todos?_page=${
            pageIndex + 1
          }&_limit=${pageSize}`
        );

        const totalItems = Number(result.headers.get('X-Total-Count'));
        console.log(totalItems);

        const todos: Todo[] = await result.json();
        const page: Page<Todo> = {
          index: pageIndex,
          size: pageSize,
          items: todos,
          totalItems: totalItems,
          totalPages: Math.ceil(totalItems / pageSize),
        };

        if (!didCancel) {
          const action: LoadSuccessAction<Page<Todo>> = {
            type: 'LOAD_SUCCESS',
            data: page,
          };
          dispatch(action);
        }
      } catch (error) {
        if (!didCancel) {
          const action: LoadErrorAction = {
            type: 'LOAD_ERROR',
            error,
          };
          dispatch(action);
        }
      }
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [pageIndex, pageSize]);

  return [state, setPageIndex, setPageSize];
};
