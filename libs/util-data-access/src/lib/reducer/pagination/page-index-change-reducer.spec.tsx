import { PageState } from '../../page-state';
import { pageIndexChangeReducer } from './page-index-change-reducer';

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

describe(pageIndexChangeReducer, () => {
  it('should set the page index', () => {
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
        index: 0,
        size: 1,
      },
      refreshPage: 0,
      filter: 'all',
      initialFilter: 'all',
    };

    const result = pageIndexChangeReducer(state, {
      type: 'PAGE_INDEX_CHANGE',
      pageIndex: 1,
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
        index: 1,
        size: 1,
      },
      refreshPage: 0,
      filter: 'all',
      initialFilter: 'all',
    };
    expect(result).toEqual(expectedState);
  });
});
