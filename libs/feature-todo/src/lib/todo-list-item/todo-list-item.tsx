import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';
import { Todo } from '../todo';

interface Props {
  todo: Todo;
  handleDeleteTodo: (todo: Todo) => void;
}

// eslint-disable-next-line
interface State {}

export class TodoListItem extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  private handleClick() {
    this.props.handleDeleteTodo(this.props.todo);
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
