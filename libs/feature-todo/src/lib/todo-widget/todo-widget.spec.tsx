import { Todo } from '@nx-react-demo/data-access-todo';
import { Loadable, Page, PageParams } from '@nx-react-demo/util-data-access';
import { render } from '@testing-library/react';
import { TodoWidget } from './todo-widget';

jest.mock('@nx-react-demo/data-access-todo', () => {
  const todo: Todo = { id: 1, content: 'hello world', completed: false };

  const loadablePage: Loadable<Page<Todo>> = {
    isLoading: false,
    data: {
      items: [todo],
      totalItems: 1,
      totalPages: 1,
    },
  };

  const pageParams: PageParams = {
    index: 0,
    size: 10,
  };

  const dispatch = jest.fn();
  return {
    useTodoPage: () => [loadablePage, pageParams, dispatch],
  };
});

describe(TodoWidget, () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TodoWidget />);

    expect(baseElement).toBeTruthy();
  });

  it('should render the title', () => {
    const { getByText } = render(<TodoWidget />);

    expect(getByText('Todos')).toBeTruthy();
  });
});
