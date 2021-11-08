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
          const errorMessage = 'Failed to load todos';
          dispatch({
            type: 'LOAD_ERROR',
            error: errorMessage,
          });
          snackbarContext.enqueueSnackbar(errorMessage, {
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
    dispatch,
    snackbarContext,
    state.pageParams.index,
    state.pageParams.size,
    state.refreshPage,
  ]);
}
