import { Todo, useGetTodoPage } from '@nx-react-demo/data-access-todo';
import { useCallback } from 'react';
import { TodoInput } from '../todo-input/todo-input';
import { TodoList } from '../todo-list/todo-list';

export function TodoWidget() {
  const [loadablePage, pageParams, setPageIndex, setPageSize] =
    useGetTodoPage();

  const handleTodoCreated = useCallback(() => setPageIndex(0), [setPageIndex]);

  const handleDeleteTodo = (todo: Todo) => {
    //   this.setState({ loading: true }, async () => {
    //     await this.props.todoService.deleteTodo(todo);
    //     this.setState(
    //       (state) => {
    //         const multiplePagesExist = state.todoPage.totalPages > 1;
    //         const lastPageIsViewed =
    //           state.todoPage.index === state.todoPage.totalPages - 1;
    //         const oneItemOnPage = state.todoPage.items.length === 1;
    //         const goBackOnPage =
    //           multiplePagesExist && lastPageIsViewed && oneItemOnPage;
    //         return {
    //           loading: true,
    //           todoPage: {
    //             ...state.todoPage,
    //             index: goBackOnPage
    //               ? state.todoPage.index - 1
    //               : state.todoPage.index,
    //             totalItems: state.todoPage.totalItems - 1,
    //             totalPages: goBackOnPage
    //               ? state.todoPage.totalPages - 1
    //               : state.todoPage.totalPages,
    //           },
    //         };
    //       },
    //       async () => {
    //         await this.loadTodos();
    //         this.props.enqueueSnackbar('Successfully deleted todo.', {
    //           variant: 'success',
    //         });
    //       }
    //     );
    //   });
  };

  return (
    <>
      <h2>Todos</h2>
      <TodoInput onTodoCreated={handleTodoCreated}></TodoInput>
      <TodoList
        loadablePage={loadablePage}
        pageParams={pageParams}
        onDeleteTodo={handleDeleteTodo}
        onPageIndexChange={setPageIndex}
        onPageSizeChange={setPageSize}
      ></TodoList>
    </>
  );
}
