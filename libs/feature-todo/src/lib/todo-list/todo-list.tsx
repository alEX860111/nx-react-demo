import List from '@mui/material/List';
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
      <div>
        {indices.map((index) => (
          <Skeleton key={index} variant="text" height={48} />
        ))}
      </div>
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
