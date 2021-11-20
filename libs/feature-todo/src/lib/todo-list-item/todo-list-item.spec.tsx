import { Todo } from '@nx-react-demo/data-access-todo';
import { render } from '@testing-library/react';
import { TodoListItem } from './todo-list-item';

describe(TodoListItem, () => {
  let todo: Todo;

  beforeEach(() => {
    todo = { id: 1, content: 'hello world', completed: false };
  });

  it('should render successfully', () => {
    const { baseElement } = render(<TodoListItem todo={todo} filter="all" />);

    expect(baseElement).toBeTruthy();
  });

  it('should render the todo content', () => {
    const { getByText } = render(<TodoListItem todo={todo} filter="all" />);

    expect(getByText(todo.content)).toBeTruthy();
  });
});
