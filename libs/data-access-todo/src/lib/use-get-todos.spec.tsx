import { renderHook } from '@testing-library/react-hooks';
import { ProviderContext } from 'notistack';
import { Todo } from './todo';
import { TodoPageState } from './todo-page-state';
import { TodoPageStateAction } from './todo-page-state-action';
import { useGetTodos } from './use-get-todos';

const snackbar = {} as jest.Mocked<ProviderContext>;

jest.mock('notistack', () => ({
  ...jest.requireActual('notistack'),
  useSnackbar: () => snackbar,
}));

describe(useGetTodos, () => {
  let fetchRef: typeof global.fetch;

  let fetchMock: jest.Mock;

  let state: TodoPageState;

  let dispatch: jest.Mock;

  beforeEach(() => {
    snackbar.enqueueSnackbar = jest.fn();
  });

  beforeEach(() => {
    fetchRef = global.fetch;
    fetchMock = jest.fn();
    global.fetch = fetchMock;
  });

  afterEach(() => {
    global.fetch = fetchRef;
  });

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
      filter: {},
    };

    dispatch = jest.fn();
  });

  it('should dispatch success action if todos have been loaded', async () => {
    const headers = new Headers();
    headers.set('X-Total-Count', '10');

    const response: Response = {
      headers,
      status: 200,
    } as jest.Mocked<Response>;

    const todos: Todo[] = [{ id: 1, content: 'foo', completed: false }];
    response.json = jest.fn().mockResolvedValue(todos);

    fetchMock.mockResolvedValue(response);

    const { waitFor } = renderHook(() => useGetTodos(state, dispatch));

    await waitFor(() => dispatch.mock.calls.length === 1);

    const loadInitAction: TodoPageStateAction = { type: 'LOAD_INIT' };
    expect(dispatch).toHaveBeenLastCalledWith(loadInitAction);

    await waitFor(() => dispatch.mock.calls.length === 2);

    expect(fetchMock).toHaveBeenCalled();

    expect(dispatch).toHaveBeenCalledTimes(2);
    const loadSuccessAction: TodoPageStateAction = {
      type: 'LOAD_SUCCESS',
      page: {
        items: todos,
        totalItems: 10,
        totalPages: 2,
      },
    };
    expect(dispatch).toHaveBeenLastCalledWith(loadSuccessAction);

    expect(snackbar.enqueueSnackbar).not.toHaveBeenCalled();
  });

  it('should dispatch error action and enqueue error message if todos could not be loaded', async () => {
    const response: Response = { status: 500 } as jest.Mocked<Response>;

    fetchMock.mockResolvedValue(response);

    const { waitFor } = renderHook(() => useGetTodos(state, dispatch));

    await waitFor(() => dispatch.mock.calls.length === 1);

    const loadInitAction: TodoPageStateAction = { type: 'LOAD_INIT' };
    expect(dispatch).toHaveBeenLastCalledWith(loadInitAction);

    await waitFor(() => dispatch.mock.calls.length === 2);

    expect(fetchMock).toHaveBeenCalled();

    expect(dispatch).toHaveBeenCalledTimes(2);
    const loadErrorAction: TodoPageStateAction = {
      type: 'LOAD_ERROR',
      error: 'Failed to load todos.',
    };
    expect(dispatch).toHaveBeenLastCalledWith(loadErrorAction);

    expect(snackbar.enqueueSnackbar).toHaveBeenCalledTimes(1);
    expect(snackbar.enqueueSnackbar).toHaveBeenCalledWith(
      'Failed to load todos.',
      { variant: 'error' }
    );
  });
});
