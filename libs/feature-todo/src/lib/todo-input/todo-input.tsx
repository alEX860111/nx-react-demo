import TextField from '@mui/material/TextField';
import { TodoCreationData } from '@nx-react-demo/data-access-todo';
import React, { useContext, useState } from 'react';
import { TodoDispatch } from '../todo-context';

export function TodoInput() {
  const dispatch = useContext(TodoDispatch);

  const [value, setValue] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (value.length === 0) {
      return;
    }

    const todoCreationData: TodoCreationData = {
      content: value,
      completed: false,
    };

    setValue('');

    dispatch({
      type: 'ITEM_CREATION_REQUESTED',
      itemCreationData: todoCreationData,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        id="todo-input"
        fullWidth
        autoFocus
        label="What needs to be done?"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    </form>
  );
}
