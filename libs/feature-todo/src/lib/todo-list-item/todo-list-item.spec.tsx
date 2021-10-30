import { Todo } from '@nx-react-demo/data-access-todo';
import { render } from '@testing-library/react';
import { SnackbarProvider } from 'notistack';
import { TodoListItem } from './todo-list-item';

describe(TodoListItem, () => {
  let todo: Todo;

  beforeEach(() => {
    todo = { id: '1', content: 'hello world' };
  });

  it('should render successfully', () => {
    const handleTodoDeleted = jest.fn();

    const { baseElement } = render(
      <SnackbarProvider maxSnack={3}>
        <TodoListItem todo={todo} onTodoDeleted={handleTodoDeleted} />
      </SnackbarProvider>
    );

    expect(baseElement).toBeTruthy();
  });

  it('should render the todo content', () => {
    const handleTodoDeleted = jest.fn();

    const { getByText } = render(
      <SnackbarProvider maxSnack={3}>
        <TodoListItem todo={todo} onTodoDeleted={handleTodoDeleted} />
      </SnackbarProvider>
    );

    expect(getByText(todo.content)).toBeTruthy();
  });
});
