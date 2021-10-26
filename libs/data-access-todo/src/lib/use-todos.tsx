import {
  Loadable,
  loadableReducer,
  Page,
} from '@nx-react-demo/util-data-access';
import { useEffect, useReducer } from 'react';
import { Todo } from './todo';

const dataFetchReducer = loadableReducer<Todo>();

export const useTodos = (): [
  Loadable<Page<Todo>>,
  (pageIndex: number) => void,
  (pageSize: number) => void
] => {
  const initalState: Loadable<Page<Todo>> = {
    isLoading: false,
    data: {
      index: 0,
      size: 2,
      items: [],
      totalItems: 0,
      totalPages: 0,
    },
  };

  const [state, dispatch] = useReducer(dataFetchReducer, initalState);

  const setPageIndex = (pageIndex: number) =>
    dispatch({ type: 'PAGE_INDEX_CHANGE', pageIndex });

  const setPageSize = (pageSize: number) =>
    dispatch({ type: 'PAGE_SIZE_CHANGE', pageSize });

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      dispatch({ type: 'LOAD_INIT' });

      try {
        const result = await fetch(
          `http://localhost:3000/todos?_page=${state.data.index + 1}&_limit=${
            state.data.size
          }`
        );

        const totalItems = Number(result.headers.get('X-Total-Count'));

        const todos: Todo[] = await result.json();
        const page: Page<Todo> = {
          index: state.data.index,
          size: state.data.size,
          items: todos,
          totalItems: totalItems,
          totalPages: Math.ceil(totalItems / state.data.size),
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

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [state.data.index, state.data.size]);

  return [state, setPageIndex, setPageSize];
};
