import { OptionalLoadable } from '@nx-react-demo/util-data-access';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import { Todo } from './todo';
import { TodoCreationData } from './todo-creation-data';

export const useCreateTodo = (): [
  OptionalLoadable<Todo>,
  React.Dispatch<TodoCreationData>
] => {
  const [todoCreationData, setTodoCreationData] = useState<TodoCreationData>();
  const [createdTodo, setCreatedTodo] = useState<OptionalLoadable<Todo>>({
    isLoading: false,
  });
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    let didCancel = false;
    const callBackend = async () => {
      if (!todoCreationData) return;
      setCreatedTodo({ isLoading: true });

      try {
        const result = await fetch('http://localhost:3000/todos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(todoCreationData),
        });
        const todo: Todo = await result.json();
        if (!didCancel) {
          enqueueSnackbar('Successfully created todo.', {
            variant: 'success',
          });
          setCreatedTodo({ isLoading: false, data: todo });
        }
      } catch (error) {
        const errorMessage = 'Failed to create todo';
        enqueueSnackbar(errorMessage, {
          variant: 'error',
        });
        setCreatedTodo({ isLoading: false, error: errorMessage });
      }
    };
    callBackend();

    return () => {
      didCancel = true;
    };
  }, [todoCreationData, enqueueSnackbar]);

  const createTodo = useCallback((todoCreationData: TodoCreationData) => {
    setTodoCreationData(todoCreationData);
  }, []);

  return [createdTodo, createTodo];
};
