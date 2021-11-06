import Grid from '@mui/material/Grid';
import { useTodoPage } from '@nx-react-demo/data-access-todo';
import { PaginatedTodoList } from '../paginated-todo-list/paginated-todo-list';
import { TodoDispatch } from '../todo-context';
import { TodoInput } from '../todo-input/todo-input';

export function TodoWidget() {
  const [loadablePage, pageParams, dispatch] = useTodoPage();

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={12} md={6} lg={4}>
        <h2>Todos</h2>
        <TodoDispatch.Provider value={dispatch}>
          <TodoInput />
          <PaginatedTodoList
            loadablePage={loadablePage}
            pageParams={pageParams}
          />
        </TodoDispatch.Provider>
      </Grid>
    </Grid>
  );
}
