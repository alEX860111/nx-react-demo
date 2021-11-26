import { PageState } from '../../page-state';
import { itemFilterRequestedReducer } from './item-filter-requested-reducer';

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

describe(itemFilterRequestedReducer, () => {
  it('should activate the loading state, reset the page index and set the filter', () => {
    const state: PersonPageState = {
      loadablePage: {
        isLoading: false,
        data: {
          items: [{ id: 1, name: 'joe' }],
          totalItems: 2,
          totalPages: 2,
        },
      },
      pageParams: {
        index: 1,
        size: 2,
      },
      refreshPage: 0,
      filter: 'all',
      initialFilter: 'all',
    };

    const filter: PersonFilter = 'validated';
    const result = itemFilterRequestedReducer(state, {
      type: 'ITEM_FILTER_REQUESTED',
      filter,
    });

    const expectedState: PersonPageState = {
      loadablePage: {
        isLoading: true,
        data: {
          items: [{ id: 1, name: 'joe' }],
          totalItems: 2,
          totalPages: 2,
        },
      },
      pageParams: {
        index: 0,
        size: 2,
      },
      refreshPage: 0,
      filter,
      initialFilter: 'all',
    };
    expect(result).toEqual(expectedState);
  });
});
