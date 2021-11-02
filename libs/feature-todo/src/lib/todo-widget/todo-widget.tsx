import {
  useCreateTodo,
  useDeleteTodo,
  useGetTodoPage,
} from '@nx-react-demo/data-access-todo';
import { useEffect } from 'react';
import { TodoInput } from '../todo-input/todo-input';
import { TodoList } from '../todo-list/todo-list';

export function TodoWidget() {
  const [
    pageState,
    setPageIndex,
    setPageSize,
    handleTodoCreated,
    handleTodoDeleted,
  ] = useGetTodoPage();

  const [createdTodo, createTodo] = useCreateTodo();

  useEffect(() => {
    if (!createdTodo.isLoading && createdTodo.data) {
      handleTodoCreated();
    }
  }, [createdTodo, handleTodoCreated]);

  const [deletedTodo, deleteTodo] = useDeleteTodo();

  useEffect(() => {
    if (!deletedTodo.isLoading && deletedTodo.data) {
      handleTodoDeleted();
    }
  }, [deletedTodo, handleTodoDeleted]);

  return (
    <>
      <h2>Todos</h2>
      <TodoInput onTodoCreationRequested={createTodo}></TodoInput>
      <TodoList
        pageState={pageState}
        onPageIndexChange={setPageIndex}
        onPageSizeChange={setPageSize}
        onTodoDeleteRequested={deleteTodo}
      ></TodoList>
    </>
  );
}
