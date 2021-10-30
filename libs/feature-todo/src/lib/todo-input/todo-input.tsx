import TextField from '@mui/material/TextField';
import {
  Todo,
  TodoCreationData,
  useCreateTodo,
} from '@nx-react-demo/data-access-todo';
import React, { useEffect, useState } from 'react';

interface Props {
  onTodoCreated: (todo: Todo) => void;
}

export function TodoInput(props: Props) {
  const [value, setValue] = useState('');
  const [createdTodo, createTodo] = useCreateTodo();

  useEffect(() => {
    if (!createdTodo.isLoading && createdTodo.data) {
      props.onTodoCreated(createdTodo.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createdTodo]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (value.length === 0) {
      return;
    }

    const todoCreationData: TodoCreationData = {
      content: value,
    };
    createTodo(todoCreationData);

    setValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        data-testid="textfield"
        fullWidth
        autoFocus
        label="What needs to be done?"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    </form>
  );
}
