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

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface State {}

export class TodoListItem extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  private handleClick() {
    this.props.onDeleteTodo(this.props.todo);
  }

  render() {
    return (
      <ListItem>
        <ListItemText primary={this.props.todo.content} />
        <ListItemSecondaryAction>
          <IconButton edge="end" onClick={this.handleClick}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}
