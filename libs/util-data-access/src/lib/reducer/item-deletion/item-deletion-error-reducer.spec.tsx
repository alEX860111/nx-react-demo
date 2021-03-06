import { PageState } from '../../page-state';
import { itemDeletionErrorReducer } from './item-deletion-error-reducer';

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

describe(itemDeletionErrorReducer, () => {
  it('should deactivate the loading state', () => {
    const state: PersonPageState = {
      loadablePage: {
        isLoading: true,
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
      itemIdToDelete: 1,
      filter: 'all',
      initialFilter: 'all',
    };

    const result = itemDeletionErrorReducer(state, {
      type: 'ITEM_DELETION_ERROR',
    });

    const expectedState: PersonPageState = {
      loadablePage: {
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
      itemIdToDelete: 1,
      filter: 'all',
      initialFilter: 'all',
    };
    expect(result).toEqual(expectedState);
  });
});
