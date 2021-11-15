import { Page } from '@nx-react-demo/util-data-access';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { Todo } from './todo';
import { TodoPageState } from './todo-page-state';
import { TodoPageStateAction } from './todo-page-state-action';

export function useGetTodos(
  state: TodoPageState,
  dispatch: React.Dispatch<TodoPageStateAction>
) {
  const snackbarContext = useSnackbar();
  useEffect(() => {
    let didCancel = false;

    async function getTodos() {
      dispatch({ type: 'LOAD_INIT' });

      try {
        const params = new Map<string, string>();
        params.set('_page', String(state.pageParams.index + 1));
        params.set('_limit', String(state.pageParams.size));
        params.set('_sort', 'id');
        params.set('_order', 'desc');
        if (state.filter.completed !== undefined) {
          params.set('completed', String(state.filter.completed));
        }
        const formattedParams = Array.from(params.entries())
          .map(([key, value]) => `${key}=${value}`)
          .join('&');

        const result = await fetch(
          `http://localhost:3000/todos?${formattedParams}`
        );

        if (result.status !== 200) throw new Error();

        const totalItems = Number(result.headers.get('X-Total-Count'));

        const todos: Todo[] = await result.json();

        if (
          totalItems > 0 &&
          todos.length === 0 &&
          state.pageParams.index > 0 &&
          !didCancel
        ) {
          dispatch({
            type: 'PAGE_INDEX_CHANGE',
            pageIndex: state.pageParams.index - 1,
          });
          return;
        }

        const page: Page<Todo> = {
          items: todos,
          totalItems: totalItems,
          totalPages: Math.ceil(totalItems / state.pageParams.size),
        };

        if (!didCancel) {
          dispatch({ type: 'LOAD_SUCCESS', page });
        }
      } catch (error) {
        const errorMessage = 'Failed to load todos.';
        if (!didCancel) {
          dispatch({
            type: 'LOAD_ERROR',
            error: errorMessage,
          });
        }
        snackbarContext.enqueueSnackbar(errorMessage, {
          variant: 'error',
        });
      }
    }

    getTodos();

    return () => {
      didCancel = true;
    };
  }, [
    dispatch,
    snackbarContext,
    state.pageParams.index,
    state.pageParams.size,
    state.filter,
    state.refreshPage,
  ]);
}
