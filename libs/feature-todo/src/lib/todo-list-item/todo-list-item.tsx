import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import { Todo } from '@nx-react-demo/data-access-todo';
import { useContext, useState } from 'react';
import { TodoDispatch } from '../todo-context';

interface Props {
  todo: Todo;
}

export function TodoListItem(props: Props) {
  const dispatch = useContext(TodoDispatch);

  const [completed, setCompleted] = useState(props.todo.completed);

  const handleDelete = () =>
    dispatch({
      type: 'ITEM_DELETION_REQUESTED',
      itemIdToDelete: props.todo.id,
    });

  const handleCheckbox = () => {
    const updatedTodo: Todo = {
      ...props.todo,
      completed: !completed,
    };
    setCompleted(updatedTodo.completed);
    dispatch({
      type: 'ITEM_UPDATE_REQUESTED',
      previousItem: props.todo,
      itemUpdateData: updatedTodo,
    });
  };

  return (
    <ListItem
      secondaryAction={
        <Tooltip title="Delete">
          <IconButton edge="end" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
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
