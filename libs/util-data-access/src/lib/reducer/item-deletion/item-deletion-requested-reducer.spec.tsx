import { PageState } from '../../page-state';
import { itemDeletionRequestedReducer } from './item-deletion-requested-reducer';

interface Person {
  id: number;
  name: string;
}

type PersonCreationData = Pick<Person, 'name'>;

type PersonPageState = PageState<Person, number, PersonCreationData>;

describe(itemDeletionRequestedReducer, () => {
  it('should set the item id to delete and activate the loading state', () => {
    const state: PersonPageState = {
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
    };
    const itemIdToDelete = 1;
    const result = itemDeletionRequestedReducer(state, {
      type: 'ITEM_DELETION_REQUESTED',
      itemIdToDelete,
    });
    const expectedState: PersonPageState = {
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
      itemIdToDelete,
    };
    expect(result).toEqual(expectedState);
  });
});
