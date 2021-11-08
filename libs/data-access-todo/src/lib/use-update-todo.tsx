import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { TodoPageState } from './todo-page-state';
import { TodoPageStateAction } from './todo-page-state-action';

export function useUpdateTodo(
  state: TodoPageState,
  dispatch: React.Dispatch<TodoPageStateAction>
) {
  const snackbarContext = useSnackbar();

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
        snackbarContext.enqueueSnackbar(errorMessage, {
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
  }, [dispatch, snackbarContext, state.itemUpdateData]);
}
