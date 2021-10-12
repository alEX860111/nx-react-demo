import { Todo } from '@nx-react-demo/data-access-todo';
import { render } from '@testing-library/react';
import { TodoListItem } from './todo-list-item';

describe(TodoListItem, () => {
  let todo: Todo;

  beforeEach(() => {
    todo = { id: '1', content: 'hello world' };
  });

  it('should render successfully', () => {
    const handleDeleteTodo = jest.fn();

    const { baseElement } = render(
      <TodoListItem todo={todo} onDeleteTodo={handleDeleteTodo} />
    );

    expect(baseElement).toBeTruthy();
  });

  it('should render the todo content', () => {
    const handleDeleteTodo = jest.fn();

    const { getByText } = render(
      <TodoListItem todo={todo} onDeleteTodo={handleDeleteTodo} />
    );

    expect(getByText(todo.content)).toBeTruthy();
  });
});
