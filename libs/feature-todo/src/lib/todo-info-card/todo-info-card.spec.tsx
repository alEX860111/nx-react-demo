import { TodoPageState } from '@nx-react-demo/data-access-todo';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { TodoInfoCard } from './todo-info-card';

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
    useTodoPage: () => [state, dispatch],
  };
});

describe(TodoInfoCard, () => {
  let wrapper: React.ComponentType;

  beforeEach(() => {
    wrapper = ({ children }) => <Router>{children}</Router>;
  });

  it('should render successfully', () => {
    const { baseElement } = render(<TodoInfoCard />, { wrapper });
    expect(baseElement).toBeTruthy();
  });
});
