import TablePagination from '@mui/material/TablePagination';
import { Todo, TodoStateFilter } from '@nx-react-demo/data-access-todo';
import { Loadable, Page, PageParams } from '@nx-react-demo/util-data-access';
import React, { useContext } from 'react';
import { SkeletonTodoList } from '../skeleton-todo-list/skeleton-todo-list';
import { TodoDispatch } from '../todo-context';
import { TodoList } from '../todo-list/todo-list';

interface Props {
  loadablePage: Loadable<Page<Todo>>;
  pageParams: PageParams;
  filter: TodoStateFilter;
}

export function PaginatedTodoList(props: Props) {
  const dispatch = useContext(TodoDispatch);

  const handlePageChange = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    pageIndex: number
  ) => dispatch({ type: 'PAGE_INDEX_CHANGE', pageIndex });

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) =>
    dispatch({
      type: 'PAGE_SIZE_CHANGE',
      pageSize: parseInt(event.target.value, 10),
    });

  return (
    <>
      {props.loadablePage.isLoading ? (
        <SkeletonTodoList pageParams={props.pageParams} />
      ) : (
        <TodoList todos={props.loadablePage.data.items} filter={props.filter} />
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
        showFirstButton={true}
        showLastButton={true}
      />
    </>
  );
}
