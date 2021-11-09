import { renderHook } from '@testing-library/react-hooks';
import { ProviderContext } from 'notistack';
import { TodoPageState } from './todo-page-state';
import { TodoPageStateAction } from './todo-page-state-action';
import { useUpdateTodo } from './use-update-todo';

const snackbar = {} as jest.Mocked<ProviderContext>;

jest.mock('notistack', () => ({
  ...jest.requireActual('notistack'),
  useSnackbar: () => snackbar,
}));

describe(useUpdateTodo, () => {
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
          items: [{ id: 1, content: 'hello world', completed: false }],
          totalItems: 1,
          totalPages: 1,
        },
      },
      pageParams: {
        index: 0,
        size: 5,
      },
      refreshPage: 0,
      itemUpdateData: { id: 1, content: 'hello world', completed: true },
    };

    dispatch = jest.fn();
  });

  it('should do nothing if todo has been updated', async () => {
    const response: Response = { status: 200 } as jest.Mocked<Response>;

    fetchMock.mockResolvedValue(response);

    const { waitFor } = renderHook(() => useUpdateTodo(state, dispatch));

    await waitFor(() => fetchMock.mock.calls.length === 1);

    expect(fetchMock).toHaveBeenCalled();
  });

  it('should dispatch error action and enqueue error message if todo could not be updated', async () => {
    const response: Response = { status: 500 } as jest.Mocked<Response>;

    fetchMock.mockResolvedValue(response);

    const { waitFor } = renderHook(() => useUpdateTodo(state, dispatch));

    await waitFor(() => snackbar.enqueueSnackbar.mock.calls.length === 1);

    expect(fetchMock).toHaveBeenCalled();

    expect(dispatch).toHaveBeenCalledTimes(1);
    const action: TodoPageStateAction = {
      type: 'REFRESH_PAGE',
    };
    expect(dispatch).toHaveBeenLastCalledWith(action);

    expect(snackbar.enqueueSnackbar).toHaveBeenCalledTimes(1);
    expect(snackbar.enqueueSnackbar).toHaveBeenCalledWith(
      'Failed to update todo.',
      { variant: 'error' }
    );
  });
});
