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

export function TodoList(props: Props) {
  const getSkeletons = () => {
    const indices = [...Array(props.todoPage.size).keys()];
    return (
      <List>
        {indices.map((index) => (
          <SkeletonTodoListItem key={index} />
        ))}
      </List>
    );
  };

  const handlePageChange = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => {
    props.onPageIndexChange(page);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    props.onPageSizeChange(parseInt(event.target.value, 10));
  };

  return (
    <>
      {props.loading ? (
        getSkeletons()
      ) : (
        <List>
          {props.todoPage.items.map((todo) => (
            <TodoListItem
              key={todo.id}
              todo={todo}
              onDeleteTodo={props.onDeleteTodo}
            />
          ))}
        </List>
      )}
      <TablePagination
        component="div"
        count={props.todoPage.totalItems}
        page={props.todoPage.index}
        onPageChange={handlePageChange}
        rowsPerPage={props.todoPage.size}
        onRowsPerPageChange={handleRowsPerPageChange}
        rowsPerPageOptions={[2, 5, 10]}
        labelRowsPerPage="todos per page"
      />
    </>
  );
}
