import { Todo } from '@nx-react-demo/data-access-todo';
import { Loadable, Page, PageParams } from '@nx-react-demo/util-data-access';
import { render } from '@testing-library/react';
import { PaginatedTodoList } from './paginated-todo-list';

jest.mock('../todo-list-item/todo-list-item', () => ({
  TodoListItem: () => <li data-testid="todo-list-item"></li>,
}));

describe(PaginatedTodoList, () => {
  let loadablePage: Loadable<Page<Todo>>;

  let pageParams: PageParams;

  beforeEach(() => {
    const todo: Todo = { id: 1, content: 'hello world', completed: false };

    loadablePage = {
      isLoading: false,
      data: {
        items: [todo],
        totalItems: 1,
        totalPages: 1,
      },
    };

    pageParams = {
      index: 0,
      size: 10,
    };
  });

  it('should render successfully', () => {
    const { baseElement } = render(
      <PaginatedTodoList loadablePage={loadablePage} pageParams={pageParams} />
    );

    expect(baseElement).toBeTruthy();
  });
});
