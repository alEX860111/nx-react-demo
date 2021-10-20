import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import { Todo } from '@nx-react-demo/data-access-todo';
import React from 'react';

interface Props {
  todo: Todo;
  onDeleteTodo: (todo: Todo) => void;
}

export function TodoListItem(props: Props) {
  const handleClick = () => {
    props.onDeleteTodo(props.todo);
  };

  return (
    <ListItem>
      <ListItemText primary={props.todo.content} />
      <ListItemSecondaryAction>
        <IconButton edge="end" onClick={handleClick}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
