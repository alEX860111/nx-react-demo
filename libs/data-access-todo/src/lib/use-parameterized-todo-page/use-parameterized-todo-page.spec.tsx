import { renderHook } from '@testing-library/react-hooks';
import { useSearchParams } from 'react-router-dom';
import { TodoPageState } from '../todo-page-state';
import { useTodoPage } from '../use-todo-page/use-todo-page';
import { useParameterizedTodoPage } from './use-parameterized-todo-page';

jest.mock('../use-todo-page/use-todo-page', () => ({
  useTodoPage: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useSearchParams: jest.fn(),
}));

describe(useParameterizedTodoPage, () => {
  let state: TodoPageState;

  let dispatch: jest.Mock;

  let useTodoPageMock: jest.Mock;

  let searchParams: URLSearchParams;

  let setSearchParams: jest.Mock;

  let useSearchParamsMock: jest.Mock;

  beforeEach(() => {
    state = {
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

    dispatch = jest.fn();

    useTodoPageMock = useTodoPage as jest.Mock;
    useTodoPageMock.mockClear();
    useTodoPageMock.mockReturnValue([state, dispatch]);

    searchParams = new URLSearchParams();

    setSearchParams = jest.fn();

    useSearchParamsMock = useSearchParams as jest.Mock;
    useSearchParamsMock.mockClear();
    useSearchParamsMock.mockReturnValue([searchParams, setSearchParams]);
  });

  it('should provide a state and a dispatch function', () => {
    const { result } = renderHook(() => useParameterizedTodoPage());
    const [resultState, resultDispatch] = result.current;

    expect(resultState).toBe(state);
    expect(resultDispatch).toBe(dispatch);
  });

  it('should initialize the page state with the default filter', () => {
    renderHook(() => useParameterizedTodoPage());

    expect(useTodoPageMock).toHaveBeenCalledWith('all');
    expect(setSearchParams).toHaveBeenCalled();
  });

  it('should initialize the page state with the search param', () => {
    searchParams.set('show', 'open');

    renderHook(() => useParameterizedTodoPage());

    expect(useTodoPageMock).toHaveBeenCalledWith('open');
    expect(setSearchParams).toHaveBeenCalled();
  });

  it('should initialize the page state with the default filter if the search param is invalid', async () => {
    searchParams.set('show', 'oops');

    renderHook(() => useParameterizedTodoPage());

    expect(useTodoPageMock).toHaveBeenCalledWith('all');
    expect(setSearchParams).toHaveBeenCalled();
  });
});
