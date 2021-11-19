import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { TodoPageState } from '../todo-page-state';
import { TodoPageStateAction } from '../todo-page-state-action';

export function useCreateTodo(
  state: TodoPageState,
  dispatch: React.Dispatch<TodoPageStateAction>
) {
  const snackbarContext = useSnackbar();

  useEffect(() => {
    const abortController = new AbortController();

    async function createTodo() {
      if (!state.itemCreationData) return;

      try {
        const result = await fetch('http://localhost:3000/todos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(state.itemCreationData),
          signal: abortController.signal,
        });

        if (result.status !== 201) throw new Error();

        if (!abortController.signal.aborted) {
          dispatch({ type: 'ITEM_CREATION_SUCCESS' });
        }
        snackbarContext.enqueueSnackbar('Successfully created todo.', {
          variant: 'success',
        });
      } catch (error) {
        if (!abortController.signal.aborted) {
          dispatch({ type: 'ITEM_CREATION_ERROR' });
        }
        snackbarContext.enqueueSnackbar('Failed to create todo.', {
          variant: 'error',
        });
      }
    }

    createTodo();

    return () => abortController.abort();
  }, [dispatch, snackbarContext, state.itemCreationData]);
}
