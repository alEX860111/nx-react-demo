import Grid from '@mui/material/Grid';
import { useTodoPage } from '@nx-react-demo/data-access-todo';
import { PaginatedTodoList } from '../paginated-todo-list/paginated-todo-list';
import { TodoDispatch } from '../todo-context';
import { TodoFilter } from '../todo-filter/todo-filter';
import { TodoInput } from '../todo-input/todo-input';
import styles from './todo-widget.module.scss';

export function TodoWidget() {
  const [loadablePage, pageParams, dispatch] = useTodoPage();

  return (
    <TodoDispatch.Provider value={dispatch}>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} md={6} lg={5}>
          <div className={styles.todoHeading}>
            <h2>Todos</h2> <TodoFilter />
          </div>
          <TodoInput />
          <PaginatedTodoList
            loadablePage={loadablePage}
            pageParams={pageParams}
          />
        </Grid>
      </Grid>
    </TodoDispatch.Provider>
  );
}
