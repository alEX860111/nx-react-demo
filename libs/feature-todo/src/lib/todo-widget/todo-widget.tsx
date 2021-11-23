import Typography from '@mui/material/Typography';
import { useParameterizedTodoPage } from '@nx-react-demo/data-access-todo';
import { PaginatedTodoList } from '../paginated-todo-list/paginated-todo-list';
import { TodoDispatch } from '../todo-context';
import { TodoFilter } from '../todo-filter/todo-filter';
import { TodoInput } from '../todo-input/todo-input';
import styles from './todo-widget.module.scss';

export function TodoWidget() {
  const [state, dispatch] = useParameterizedTodoPage();

  return (
    <TodoDispatch.Provider value={dispatch}>
      <div className={styles.todoHeading}>
        <Typography variant="h4">Todos</Typography>
        <TodoFilter filter={state.filter} />
      </div>
      <TodoInput />
      <PaginatedTodoList
        loadablePage={state.loadablePage}
        pageParams={state.pageParams}
        filter={state.filter}
      />
    </TodoDispatch.Provider>
  );
}
