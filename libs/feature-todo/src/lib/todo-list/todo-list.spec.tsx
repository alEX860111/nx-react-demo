import { Todo } from '@nx-react-demo/data-access-todo';
import { Page } from '@nx-react-demo/util-data-access';
import { render } from '@testing-library/react';
import { TodoList } from './todo-list';

jest.mock('../todo-list-item/todo-list-item', () => ({
  TodoListItem: () => <li data-testid="todo-list-item"></li>,
}));

describe('TodoList', () => {
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
    const handlePageIndexChange = jest.fn();
    const handlePageSizeChange = jest.fn();

    const { baseElement } = render(
      <TodoList
        todoPage={todoPage}
        loading={false}
        onDeleteTodo={handleDeleteTodo}
        onPageIndexChange={handlePageIndexChange}
        onPageSizeChange={handlePageSizeChange}
      />
    );

    expect(baseElement).toBeTruthy();
  });

  it('should render the list items', () => {
    const handleDeleteTodo = jest.fn();
    const handlePageIndexChange = jest.fn();
    const handlePageSizeChange = jest.fn();

    const { getAllByTestId } = render(
      <TodoList
        todoPage={todoPage}
        loading={false}
        onDeleteTodo={handleDeleteTodo}
        onPageIndexChange={handlePageIndexChange}
        onPageSizeChange={handlePageSizeChange}
      />
    );

    expect(getAllByTestId('todo-list-item').length).toEqual(1);
  });
});
