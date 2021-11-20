import Typography from '@mui/material/Typography';
import {
  isTodoStateFilter,
  TodoStateFilter,
  useTodoPage,
} from '@nx-react-demo/data-access-todo';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PaginatedTodoList } from '../paginated-todo-list/paginated-todo-list';
import { TodoDispatch } from '../todo-context';
import { TodoFilter } from '../todo-filter/todo-filter';
import { TodoInput } from '../todo-input/todo-input';
import styles from './todo-widget.module.scss';

export function TodoWidget() {
  const [searchParams, setSearchParams] = useSearchParams();

  const param = searchParams.get('show');

  const filter: TodoStateFilter = isTodoStateFilter(param) ? param : 'all';

  const [state, dispatch] = useTodoPage(filter);

  useEffect(() => {
    setSearchParams({ show: state.filter });
  }, [state.filter, setSearchParams]);

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
