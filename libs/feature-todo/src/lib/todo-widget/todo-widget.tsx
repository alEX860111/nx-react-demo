import {
  Todo,
  TodoCreationData,
  useTodos,
} from '@nx-react-demo/data-access-todo';
import React from 'react';
import { TodoInput } from '../todo-input/todo-input';
import { TodoList } from '../todo-list/todo-list';

interface Props {
  label: string;
}

export function TodoWidget(props: Props) {
  const [loadable, setPageIndex, setPageSize] = useTodos();

  const handleCreateTodo = (todoCreationData: TodoCreationData) => {
    // this.setState(
    //   (state) => ({
    //     loading: true,
    //     todoPage: { ...state.todoPage, index: 0 },
    //   }),
    //   async () => {
    //     await this.props.todoService.addTodo(todoCreationData);
    //     await this.loadTodos();
    //     this.props.enqueueSnackbar('Successfully created todo.', {
    //       variant: 'success',
    //     });
    //   }
    // );
  };

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
      <h2>{props.label}</h2>
      <TodoInput onCreateTodo={handleCreateTodo}></TodoInput>
      <TodoList
        todoPage={loadable.data}
        loading={loadable.isLoading}
        onDeleteTodo={handleDeleteTodo}
        onPageIndexChange={setPageIndex}
        onPageSizeChange={setPageSize}
      ></TodoList>
    </>
  );
}
