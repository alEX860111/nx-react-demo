import {
  Loadable,
  LoadableAction,
  loadableReducer,
  Page,
  PageParams,
  pageParamsReducer,
} from '@nx-react-demo/util-data-access';
import React, { Reducer, useCallback, useEffect, useReducer } from 'react';
import { Todo } from './todo';

export const useGetTodoPage = (): [
  Loadable<Page<Todo>>,
  PageParams,
  React.Dispatch<number>,
  React.Dispatch<number>
] => {
  const initialPageParams: PageParams = {
    index: 0,
    size: 5,
  };
  const [pageParams, dispatchPageParamsAction] = useReducer(
    pageParamsReducer,
    initialPageParams
  );

  const initialPageState: Loadable<Page<Todo>> = {
    isLoading: false,
    data: {
      items: [],
      totalItems: 0,
      totalPages: 0,
    },
  };

  const [state, dispatch] = useReducer(
    loadableReducer as Reducer<
      Loadable<Page<Todo>>,
      LoadableAction<Page<Todo>>
    >,
    initialPageState
  );

  useEffect(() => {
    let didCancel = false;
    const callBackend = async () => {
      dispatch({ type: 'LOAD_INIT' });

      try {
        const result = await fetch(
          `http://localhost:3000/todos?_page=${pageParams.index + 1}&_limit=${
            pageParams.size
          }&_sort=id&_order=desc`
        );

        const totalItems = Number(result.headers.get('X-Total-Count'));

        const todos: Todo[] = await result.json();
        const page: Page<Todo> = {
          items: todos,
          totalItems: totalItems,
          totalPages: Math.ceil(totalItems / pageParams.size),
        };

        if (!didCancel) {
          dispatch({ type: 'LOAD_SUCCESS', data: page });
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
  }, [pageParams]);

  const setPageIndex = useCallback(
    (pageIndex: number) =>
      dispatchPageParamsAction({ type: 'PAGE_INDEX_CHANGE', pageIndex }),
    []
  );

  const setPageSize = useCallback(
    (pageSize: number) =>
      dispatchPageParamsAction({ type: 'PAGE_SIZE_CHANGE', pageSize }),
    []
  );

  return [state, pageParams, setPageIndex, setPageSize];
};
