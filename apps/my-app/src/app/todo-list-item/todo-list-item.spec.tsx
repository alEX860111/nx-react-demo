import { render } from '@testing-library/react';
import { Todo } from '../todo/todo';
import { TodoListItem } from './todo-list-item';

describe(TodoListItem, () => {
  it('should render successfully', () => {
    const todo: Todo = { id: 1, content: 'hello world' };
    const { baseElement } = render(<TodoListItem todo={todo} />);

    expect(baseElement).toBeTruthy();
  });

  it('should render the todo content as a list item', () => {
    const todo: Todo = { id: 1, content: 'hello world' };
    const { getByText } = render(<TodoListItem todo={todo} />);

    expect(getByText(todo.content).tagName).toEqual('LI');
  });
});
