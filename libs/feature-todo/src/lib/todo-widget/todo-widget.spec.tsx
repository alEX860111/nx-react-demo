import {
  Page,
  Todo,
  TodoService,
  TodoServiceDIToken,
} from '@nx-react-demo/data-access-todo';
import { render } from '@testing-library/react';
import { SnackbarProvider } from 'notistack';
import { container } from 'tsyringe';
import { TodoWidget } from './todo-widget';

describe('TodoWidget', () => {
  it('should render successfully', () => {
    const todo: Todo = { id: '1', content: 'hello world' };

    const todoPage: Page<Todo> = {
      index: 0,
      size: 10,
      items: [todo],
      totalItems: 1,
      totalPages: 1,
    };

    const todoServiceMock = {} as jest.Mocked<TodoService>;
    todoServiceMock.getTodos = jest
      .fn()
      .mockReturnValue(Promise.resolve(todoPage));

    container.registerInstance(TodoServiceDIToken, todoServiceMock);

    const { baseElement } = render(
      <SnackbarProvider maxSnack={3}>
        <TodoWidget label="My todos" />
      </SnackbarProvider>
    );

    expect(baseElement).toBeTruthy();
  });
});
