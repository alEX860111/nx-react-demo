import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Todo, TodoDeletionData } from '@nx-react-demo/data-access-todo';

interface Props {
  todo: Todo;
  onTodoDeletionRequested: (todoDeletionData: TodoDeletionData) => void;
}

export function TodoListItem(props: Props) {
  const handleDelete = () => {
    props.onTodoDeletionRequested({ id: props.todo.id });
  };

  const handleCheckbox = () => {
    console.log(props.todo.completed);
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
          <Checkbox edge="start" checked={props.todo.completed} disableRipple />
        </ListItemIcon>
        <ListItemText primary={props.todo.content} />
      </ListItemButton>
    </ListItem>
  );
}
