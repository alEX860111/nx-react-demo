import { TodoPageState } from '@nx-react-demo/data-access-todo';
import { render } from '@testing-library/react';
import { TodoWidget } from './todo-widget';

jest.mock('@nx-react-demo/data-access-todo', () => {
  const state: TodoPageState = {
    loadablePage: {
      isLoading: false,
      data: {
        items: [],
        totalItems: 0,
        totalPages: 0,
      },
    },
    pageParams: {
      index: 0,
      size: 5,
    },
    refreshPage: 0,
    filter: 'all',
  };

  const dispatch = jest.fn();
  return {
    ...jest.requireActual('@nx-react-demo/data-access-todo'),
    useTodoPage: () => [state, dispatch],
  };
});

jest.mock('react-router-dom', () => {
  const searchParams = new URLSearchParams();
  const setSearchParams = jest.fn();
  return {
    useSearchParams: () => [searchParams, setSearchParams],
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
