import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import { Todo, useDeleteTodo } from '@nx-react-demo/data-access-todo';
import { useEffect } from 'react';

interface Props {
  todo: Todo;
  onTodoDeleted: (todo: Todo) => void;
}

export function TodoListItem(props: Props) {
  const [deletedTodo, deleteTodo] = useDeleteTodo();

  useEffect(() => {
    if (!deletedTodo.isLoading && deletedTodo.data) {
      props.onTodoDeleted(deletedTodo.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deletedTodo]);

  const handleClick = () => {
    deleteTodo(props.todo);
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
