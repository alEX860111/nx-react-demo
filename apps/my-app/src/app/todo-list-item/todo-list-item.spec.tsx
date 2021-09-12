import { render } from '@testing-library/react';
import { Todo } from '../todo/todo';
import { TodoListItem } from './todo-list-item';

describe(TodoListItem, () => {
  let todo: Todo;

  beforeEach(() => {
    todo = { id: 1, content: 'hello world' };
  });

  it('should render successfully', () => {
    const { baseElement } = render(<TodoListItem todo={todo} />);

    expect(baseElement).toBeTruthy();
  });

  it('should render the todo content as a list item', () => {
    const { getByText } = render(<TodoListItem todo={todo} />);

    expect(getByText(todo.content).tagName).toEqual('LI');
  });
});
