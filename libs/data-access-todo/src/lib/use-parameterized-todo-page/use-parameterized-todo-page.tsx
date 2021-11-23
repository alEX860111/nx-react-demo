import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TodoPageState } from '../todo-page-state';
import { TodoPageStateAction } from '../todo-page-state-action';
import { isTodoStateFilter, TodoStateFilter } from '../todo-state-filter';
import { useTodoPage } from '../use-todo-page/use-todo-page';

export function useParameterizedTodoPage(): [
  TodoPageState,
  React.Dispatch<TodoPageStateAction>
] {
  const [searchParams, setSearchParams] = useSearchParams();

  const param = searchParams.get('show');

  const filter: TodoStateFilter = isTodoStateFilter(param) ? param : 'all';

  const [state, dispatch] = useTodoPage(filter);

  useEffect(() => {
    setSearchParams({ show: state.filter });
  }, [state.filter, setSearchParams]);

  return [state, dispatch];
}
