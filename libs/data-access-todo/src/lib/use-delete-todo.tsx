import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { TodoPageState } from './todo-page-state';
import { TodoPageStateAction } from './todo-page-state-action';

export function useDeleteTodo(
  state: TodoPageState,
  dispatch: React.Dispatch<TodoPageStateAction>
) {
  const snackbarContext = useSnackbar();

  useEffect(() => {
    let didCancel = false;

    async function deleteTodo() {
      if (state.itemIdToDelete === undefined) return;

      try {
        const result = await fetch(
          `http://localhost:3000/todos/${state.itemIdToDelete}`,
          { method: 'DELETE' }
        );

        if (result.status !== 200) throw new Error();

        if (!didCancel) {
          dispatch({ type: 'ITEM_DELETION_SUCCESS' });
          snackbarContext.enqueueSnackbar('Successfully deleted todo.', {
            variant: 'success',
          });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: 'ITEM_DELETION_ERROR' });
          snackbarContext.enqueueSnackbar('Failed to delete todo', {
            variant: 'error',
          });
        }
      }
    }

    deleteTodo();

    return () => {
      didCancel = true;
    };
  }, [dispatch, snackbarContext, state.itemIdToDelete]);
}
