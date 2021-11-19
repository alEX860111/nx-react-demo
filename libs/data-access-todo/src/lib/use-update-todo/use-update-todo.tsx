import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { TodoPageState } from '../todo-page-state';
import { TodoPageStateAction } from '../todo-page-state-action';

export function useUpdateTodo(
  state: TodoPageState,
  dispatch: React.Dispatch<TodoPageStateAction>
) {
  const snackbarContext = useSnackbar();

  useEffect(() => {
    const abortController = new AbortController();

    async function updateTodo() {
      if (!state.itemUpdateData) return;

      try {
        const result = await fetch(
          `http://localhost:3000/todos/${state.itemUpdateData.id}`,
          {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(state.itemUpdateData),
            signal: abortController.signal,
          }
        );

        if (result.status !== 200) throw new Error();

        if (!abortController.signal.aborted) {
          dispatch({ type: 'ITEM_UPDATE_SUCCESS' });
        }
        snackbarContext.enqueueSnackbar('Successfully updated todo.', {
          variant: 'success',
        });
      } catch (error) {
        if (!abortController.signal.aborted) {
          dispatch({ type: 'ITEM_UPDATE_ERROR' });
        }
        snackbarContext.enqueueSnackbar('Failed to update todo.', {
          variant: 'error',
        });
      }
    }

    updateTodo();

    return () => abortController.abort();
  }, [dispatch, snackbarContext, state.itemUpdateData]);
}
