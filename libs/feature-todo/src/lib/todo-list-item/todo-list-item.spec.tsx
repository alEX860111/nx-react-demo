import { Todo } from '@nx-react-demo/data-access-todo';
import { render } from '@testing-library/react';
import { TodoListItem } from './todo-list-item';

describe(TodoListItem, () => {
  let todo: Todo;

  beforeEach(() => {
    todo = { id: '1', content: 'hello world', completed: false };
  });

  it('should render successfully', () => {
    const handleTodoDeletionRequested = jest.fn();

    const { baseElement } = render(
      <TodoListItem
        todo={todo}
        onTodoDeletionRequested={handleTodoDeletionRequested}
      />
    );

    expect(baseElement).toBeTruthy();
  });

  it('should render the todo content', () => {
    const handleTodoDeletionRequested = jest.fn();

    const { getByText } = render(
      <TodoListItem
        todo={todo}
        onTodoDeletionRequested={handleTodoDeletionRequested}
      />
    );

    expect(getByText(todo.content)).toBeTruthy();
  });
});
