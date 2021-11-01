import { renderHook } from '@testing-library/react-hooks';
import { Todo } from './todo';
import { useGetTodoPage } from './use-get-todo-page';

describe(useGetTodoPage, () => {
  let fetchRef: typeof global.fetch;

  const todos: Todo[] = [{ id: '1', content: 'foo' }];

  beforeAll(() => {
    const response: Response = {
      headers: new Headers(),
    } as jest.Mocked<Response>;
    response.json = jest.fn().mockResolvedValue(todos);

    fetchRef = global.fetch;
    global.fetch = jest.fn().mockResolvedValue(response);
  });

  afterAll(() => {
    global.fetch = fetchRef;
  });

  it('should load the todos', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useGetTodoPage());

    await waitForNextUpdate();

    const [loadablePage] = result.current;
    expect(loadablePage.data.items).toEqual(todos);
  });
});
