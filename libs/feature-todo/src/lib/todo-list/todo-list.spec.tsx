import { render } from '@testing-library/react';
import { Todo } from '../todo';
import { TodoList } from './todo-list';

jest.mock('../todo-list-item/todo-list-item', () => ({
  TodoListItem: () => <li data-testid="todo-list-item"></li>,
}));

describe(TodoList, () => {
  let todoList: Todo[];

  beforeEach(() => {
    const todo: Todo = { id: '1', content: 'hello world' };
    todoList = [todo];
  });

  it('should render successfully', () => {
    const handleDeleteTodo = jest.fn();

    const { baseElement } = render(
      <TodoList todoList={todoList} handleDeleteTodo={handleDeleteTodo} />
    );

    expect(baseElement).toBeTruthy();
  });

  it('should render the list items', () => {
    const handleDeleteTodo = jest.fn();

    const { getAllByTestId } = render(
      <TodoList todoList={todoList} handleDeleteTodo={handleDeleteTodo} />
    );

    expect(getAllByTestId('todo-list-item').length).toEqual(1);
  });
});
