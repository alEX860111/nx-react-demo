import List from '@mui/material/List';
import TablePagination from '@mui/material/TablePagination';
import { Page, Todo } from '@nx-react-demo/data-access-todo';
import React from 'react';
import { SkeletonTodoListItem } from '../skeleton-todo-list-item/skeleton-todo-list-item';
import { TodoListItem } from '../todo-list-item/todo-list-item';

interface Props {
  todoPage: Page<Todo>;
  loading: boolean;
  onDeleteTodo: (todo: Todo) => void;
  onPageIndexChange: (pageIndex: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface State {}

export class TodoList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleRowsPerPageChange = this.handleRowsPerPageChange.bind(this);
  }

  private getSkeletons() {
    const indices = [...Array(this.props.todoPage.size).keys()];
    return (
      <List>
        {indices.map((index) => (
          <SkeletonTodoListItem key={index} />
        ))}
      </List>
    );
  }

  private handlePageChange(
    _event: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ): void {
    this.props.onPageIndexChange(page);
  }

  private handleRowsPerPageChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    this.props.onPageSizeChange(parseInt(event.target.value, 10));
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
              />
            ))}
          </List>
        )}
        <TablePagination
          component="div"
          count={this.props.todoPage.totalItems}
          page={this.props.todoPage.index}
          onPageChange={this.handlePageChange}
          rowsPerPage={this.props.todoPage.size}
          onRowsPerPageChange={this.handleRowsPerPageChange}
          rowsPerPageOptions={[2, 5, 10]}
          labelRowsPerPage="todos per page"
        />
      </>
    );
  }
}
