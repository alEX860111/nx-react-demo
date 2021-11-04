import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Todo, TodoDeletionData } from '@nx-react-demo/data-access-todo';
import { useState } from 'react';

interface Props {
  todo: Todo;
  onTodoDeletionRequested: (todoDeletionData: TodoDeletionData) => void;
  onTodoUpdateRequested: (todo: Todo) => void;
}

export function TodoListItem(props: Props) {
  const [completed, setCompleted] = useState(props.todo.completed);

  const handleDelete = () => {
    props.onTodoDeletionRequested({ id: props.todo.id });
  };

  const handleCheckbox = () => {
    const updatedTodo: Todo = {
      ...props.todo,
      completed: !completed,
    };
    setCompleted(updatedTodo.completed);
    props.onTodoUpdateRequested(updatedTodo);
  };

  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemButton onClick={handleCheckbox} dense>
        <ListItemIcon>
          <Checkbox edge="start" checked={completed} disableRipple />
        </ListItemIcon>
        <ListItemText primary={props.todo.content} />
      </ListItemButton>
    </ListItem>
  );
}
