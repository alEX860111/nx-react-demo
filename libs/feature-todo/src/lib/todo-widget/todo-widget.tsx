import { useGetTodoPage } from '@nx-react-demo/data-access-todo';
import { TodoInput } from '../todo-input/todo-input';
import { TodoList } from '../todo-list/todo-list';

export function TodoWidget() {
  const [loadablePage, pageParams, setPageIndex, setPageSize] =
    useGetTodoPage();

  const handleTodoCreated = () => {
    setPageIndex(0);
  };

  const handleTodoDeleted = () => {
    const loadPreviousPage =
      loadablePage.data.items.length === 1 && loadablePage.data.totalPages > 1;
    const pageIndex = loadPreviousPage
      ? pageParams.index - 1
      : pageParams.index;
    setPageIndex(pageIndex);
  };

  return (
    <>
      <h2>Todos</h2>
      <TodoInput onTodoCreated={handleTodoCreated}></TodoInput>
      <TodoList
        loadablePage={loadablePage}
        pageParams={pageParams}
        onTodoDeleted={handleTodoDeleted}
        onPageIndexChange={setPageIndex}
        onPageSizeChange={setPageSize}
      ></TodoList>
    </>
  );
}
