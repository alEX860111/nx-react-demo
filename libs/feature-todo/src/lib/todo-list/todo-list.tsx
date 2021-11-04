import List from '@mui/material/List';
import TablePagination from '@mui/material/TablePagination';
import { Todo, TodoDeletionData } from '@nx-react-demo/data-access-todo';
import { Loadable, Page, PageParams } from '@nx-react-demo/util-data-access';
import React from 'react';
import { SkeletonTodoListItem } from '../skeleton-todo-list-item/skeleton-todo-list-item';
import { TodoListItem } from '../todo-list-item/todo-list-item';

interface Props {
  loadablePage: Loadable<Page<Todo>>;
  pageParams: PageParams;
  onTodoDeletionRequested: (todoDeletionData: TodoDeletionData) => void;
  onTodoUpdateRequested: (todo: Todo) => void;
  onPageIndexChange: (pageIndex: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

export function TodoList(props: Props) {
  const getSkeletons = () => {
    const indices = [...Array(props.pageParams.size).keys()];
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
      {props.loadablePage.isLoading ? (
        getSkeletons()
      ) : (
        <List>
          {props.loadablePage.data.items.map((todo) => (
            <TodoListItem
              key={todo.id}
              todo={todo}
              onTodoDeletionRequested={props.onTodoDeletionRequested}
              onTodoUpdateRequested={props.onTodoUpdateRequested}
            />
          ))}
        </List>
      )}
      <TablePagination
        component="div"
        count={props.loadablePage.data.totalItems}
        page={props.pageParams.index}
        onPageChange={handlePageChange}
        rowsPerPage={props.pageParams.size}
        onRowsPerPageChange={handleRowsPerPageChange}
        rowsPerPageOptions={[2, 5, 10]}
        labelRowsPerPage="todos per page"
      />
    </>
  );
}
