import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import Pagination from '@mui/material/Pagination';
import Skeleton from '@mui/material/Skeleton';
import React from 'react';
import { Page } from '../page';
import { Todo } from '../todo';
import { TodoListItem } from '../todo-list-item/todo-list-item';

interface Props {
  todoPage: Page<Todo>;
  loading: boolean;
  onDeleteTodo: (todo: Todo) => void;
  onPageChange: (pageIndex: number) => void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface State {}

export class TodoList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.handlePageChange = this.handlePageChange.bind(this);
  }

  private getSkeletons() {
    const indices = [...Array(this.props.todoPage.size).keys()];
    return (
      <List>
        {indices.map((index) => (
          <ListItem key={index}>
            <ListItemText primary={<Skeleton variant="text" />} />
            <ListItemSecondaryAction>
              <Skeleton variant="circular" width={25} height={25} />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    );
  }

  private handlePageChange(_event: React.ChangeEvent<unknown>, page: number) {
    this.props.onPageChange(page - 1);
  }

  render() {
    return (
      <>
        {this.props.loading ? (
          this.getSkeletons()
        ) : (
          <List>
            {this.props.todoPage.items.map((todo) => (
              <TodoListItem
                key={todo.id}
                todo={todo}
                handleDeleteTodo={this.props.onDeleteTodo}
              ></TodoListItem>
            ))}
          </List>
        )}
        <Pagination
          count={this.props.todoPage.totalPages}
          page={this.props.todoPage.index + 1}
          disabled={this.props.loading}
          onChange={this.handlePageChange}
        />
      </>
    );
  }
}
