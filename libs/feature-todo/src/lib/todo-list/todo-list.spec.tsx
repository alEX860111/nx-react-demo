import { render } from '@testing-library/react';
import { Page } from '../page';
import { Todo } from '../todo';
import { TodoList } from './todo-list';

jest.mock('../todo-list-item/todo-list-item', () => ({
  TodoListItem: () => <li data-testid="todo-list-item"></li>,
}));

describe(TodoList, () => {
  let todoPage: Page<Todo>;

  beforeEach(() => {
    const todo: Todo = { id: '1', content: 'hello world' };

    todoPage = {
      index: 0,
      size: 10,
      items: [todo],
      totalItems: 1,
      totalPages: 1,
    };
  });

  it('should render successfully', () => {
    const handleDeleteTodo = jest.fn();
    const handlePageChange = jest.fn();

    const { baseElement } = render(
      <TodoList
        todoPage={todoPage}
        loading={false}
        onDeleteTodo={handleDeleteTodo}
        onPageChange={handlePageChange}
      />
    );

    expect(baseElement).toBeTruthy();
  });

  it('should render the list items', () => {
    const handleDeleteTodo = jest.fn();
    const handlePageChange = jest.fn();

    const { getAllByTestId } = render(
      <TodoList
        todoPage={todoPage}
        loading={false}
        onDeleteTodo={handleDeleteTodo}
        onPageChange={handlePageChange}
      />
    );

    expect(getAllByTestId('todo-list-item').length).toEqual(1);
  });
});
