import { OptionalLoadable } from '@nx-react-demo/util-data-access';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { Todo } from './todo';

export const useDeleteTodo = (): [
  OptionalLoadable<Todo>,
  React.Dispatch<Todo>
] => {
  const [todo, setTodo] = useState<Todo>();
  const [deletedTodo, setDeletedTodo] = useState<OptionalLoadable<Todo>>({
    isLoading: false,
  });
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    let didCancel = false;
    const callBackend = async () => {
      if (!todo) return;
      setDeletedTodo({ isLoading: true });

      try {
        const result = await fetch(`http://localhost:3000/todos/${todo.id}`, {
          method: 'DELETE',
        });

        if (!didCancel) {
          enqueueSnackbar('Successfully deleted todo.', {
            variant: 'success',
          });
          setDeletedTodo({ isLoading: false, data: todo });
        }
      } catch (error) {
        const errorMessage = 'Failed to delete todo';
        enqueueSnackbar(errorMessage, {
          variant: 'error',
        });
        setDeletedTodo({ isLoading: false, error: errorMessage });
      }
    };
    callBackend();

    return () => {
      didCancel = true;
    };
  }, [todo, enqueueSnackbar]);

  return [deletedTodo, setTodo];
};
