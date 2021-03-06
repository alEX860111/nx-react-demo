import { PageState } from '../../page-state';
import { loadSuccessReducer } from './load-success-reducer';

interface Person {
  id: number;
  name: string;
}

type PersonCreationData = Pick<Person, 'name'>;

type PersonFilter = 'all' | 'validated' | 'unvalidated';

type PersonPageState = PageState<
  Person,
  number,
  PersonCreationData,
  PersonFilter
>;

describe(loadSuccessReducer, () => {
  it('should erase the error, deactivate the loading state and set the page', () => {
    const state: PersonPageState = {
      loadablePage: {
        error: 'oops',
        isLoading: true,
        data: { items: [], totalItems: 0, totalPages: 0 },
      },
      pageParams: {
        index: 0,
        size: 10,
      },
      refreshPage: 0,
      filter: 'all',
      initialFilter: 'all',
    };

    const result = loadSuccessReducer(state, {
      type: 'LOAD_SUCCESS',
      page: { items: [{ id: 1, name: 'joe' }], totalItems: 1, totalPages: 1 },
    });

    const expectedState: PersonPageState = {
      loadablePage: {
        error: undefined,
        isLoading: false,
        data: {
          items: [{ id: 1, name: 'joe' }],
          totalItems: 1,
          totalPages: 1,
        },
      },
      pageParams: {
        index: 0,
        size: 10,
      },
      refreshPage: 0,
      filter: 'all',
      initialFilter: 'all',
    };
    expect(result).toEqual(expectedState);
  });
});
