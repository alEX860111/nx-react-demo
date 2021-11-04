import { useGetTodoPage } from '@nx-react-demo/data-access-todo';
import { TodoInput } from '../todo-input/todo-input';
import { TodoList } from '../todo-list/todo-list';

export function TodoWidget() {
  const [
    loadablePage,
    pageParams,
    setPageIndex,
    setPageSize,
    createTodo,
    deleteTodo,
    updateTodo,
  ] = useGetTodoPage();

  return (
    <>
      <h2>Todos</h2>
      <TodoInput onTodoCreationRequested={createTodo}></TodoInput>
      <TodoList
        loadablePage={loadablePage}
        pageParams={pageParams}
        onPageIndexChange={setPageIndex}
        onPageSizeChange={setPageSize}
        onTodoDeletionRequested={deleteTodo}
        onTodoUpdateRequested={updateTodo}
      ></TodoList>
    </>
  );
}
