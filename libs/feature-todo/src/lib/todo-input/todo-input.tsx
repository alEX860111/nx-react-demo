import TextField from '@mui/material/TextField';
import { TodoCreationData } from '@nx-react-demo/data-access-todo';
import React, { useState } from 'react';

interface Props {
  onTodoCreationRequested: (todoCreationData: TodoCreationData) => void;
}

export function TodoInput(props: Props) {
  const [value, setValue] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (value.length === 0) {
      return;
    }

    const todoCreationData: TodoCreationData = {
      content: value,
    };
    props.onTodoCreationRequested(todoCreationData);

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
