import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
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
