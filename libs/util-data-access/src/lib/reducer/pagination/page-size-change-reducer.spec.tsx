import { PageState } from '../../page-state';
import { pageSizeChangeReducer } from './page-size-change-reducer';

interface Person {
  id: number;
  name: string;
}

type PersonCreationData = Pick<Person, 'name'>;

type PersonPageState = PageState<Person, number, PersonCreationData>;

describe(pageSizeChangeReducer, () => {
  it('PAGE_SIZE_CHANGE should set the page size and reset the page index', () => {
    const state: PersonPageState = {
      loadablePage: {
        isLoading: false,
        data: {
          items: [{ id: 1, name: 'zoe' }],
          totalItems: 2,
          totalPages: 2,
        },
      },
      pageParams: {
        index: 1,
        size: 1,
      },
      refreshPage: 0,
    };
    const result = pageSizeChangeReducer(state, {
      type: 'PAGE_SIZE_CHANGE',
      pageSize: 10,
    });
    const expectedState: PersonPageState = {
      loadablePage: {
        isLoading: false,
        data: {
          items: [{ id: 1, name: 'zoe' }],
          totalItems: 2,
          totalPages: 2,
        },
      },
      pageParams: {
        index: 0,
        size: 10,
      },
      refreshPage: 0,
    };
    expect(result).toEqual(expectedState);
  });
});
