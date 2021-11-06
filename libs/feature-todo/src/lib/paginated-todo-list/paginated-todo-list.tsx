import List from '@mui/material/List';
import TablePagination from '@mui/material/TablePagination';
import { Todo } from '@nx-react-demo/data-access-todo';
import { Loadable, Page, PageParams } from '@nx-react-demo/util-data-access';
import React, { useContext } from 'react';
import { SkeletonTodoListItem } from '../skeleton-todo-list-item/skeleton-todo-list-item';
import { TodoDispatch } from '../todo-context';
import { TodoListItem } from '../todo-list-item/todo-list-item';

interface Props {
  loadablePage: Loadable<Page<Todo>>;
  pageParams: PageParams;
}

export function PaginatedTodoList(props: Props) {
  const dispatch = useContext(TodoDispatch);

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
        getSkeletons()
      ) : (
        <List>
          {props.loadablePage.data.items.map((todo) => (
            <TodoListItem key={todo.id} todo={todo} />
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
