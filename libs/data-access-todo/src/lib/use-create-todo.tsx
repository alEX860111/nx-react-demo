import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { TodoPageState } from './todo-page-state';
import { TodoPageStateAction } from './todo-page-state-action';

export function useCreateTodo(
  state: TodoPageState,
  dispatch: React.Dispatch<TodoPageStateAction>
) {
  const snackbarContext = useSnackbar();

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
          snackbarContext.enqueueSnackbar('Successfully created todo.', {
            variant: 'success',
          });
          dispatch({ type: 'ITEM_CREATION_SUCCESS' });
        }
      } catch (error) {
        const errorMessage = 'Failed to create todo';
        snackbarContext.enqueueSnackbar(errorMessage, { variant: 'error' });
      }
    }

    createTodo();

    return () => {
      didCancel = true;
    };
  }, [dispatch, snackbarContext, state.itemCreationData]);
}
