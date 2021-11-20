import { Todo, TodoStateFilter } from '@nx-react-demo/data-access-todo';
import { render } from '@testing-library/react';
import { TodoList } from './todo-list';

jest.mock('../todo-list-item/todo-list-item', () => ({
  TodoListItem: () => <li data-testid="todo-list-item"></li>,
}));

describe(TodoList, () => {
  let todos: Todo[];
  let filter: TodoStateFilter;

  beforeEach(() => {
    const todo: Todo = { id: 1, content: 'hello world', completed: false };
    todos = [todo];
    filter = 'all';
  });

  it('should render successfully', () => {
    const { baseElement } = render(<TodoList todos={todos} filter={filter} />);

    expect(baseElement).toBeTruthy();
  });

  it('should render the list items', () => {
    const { getAllByTestId } = render(
      <TodoList todos={todos} filter={filter} />
    );

    expect(getAllByTestId('todo-list-item').length).toEqual(1);
  });
});
