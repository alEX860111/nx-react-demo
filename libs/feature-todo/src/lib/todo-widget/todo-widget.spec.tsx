import { render } from '@testing-library/react';
import { container } from 'tsyringe';
import { TodoService, TodoServiceDIToken } from '../todo-service';
import { TodoWidget } from './todo-widget';

describe(TodoWidget, () => {
  it('should render successfully', () => {
    const todoServiceMock = {} as jest.Mocked<TodoService>;
    todoServiceMock.getTodos = jest.fn().mockReturnValue(Promise.resolve([]));

    container.registerInstance(TodoServiceDIToken, todoServiceMock);

    const { baseElement } = render(<TodoWidget label="My todos" />);

    expect(baseElement).toBeTruthy();
  });
});
