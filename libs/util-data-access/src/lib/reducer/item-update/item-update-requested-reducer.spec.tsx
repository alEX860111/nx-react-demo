import { PageState } from '../../page-state';
import { itemUpdateRequestedReducer } from './item-update-requested-reducer';

interface Person {
  id: number;
  name: string;
}

type PersonCreationData = Pick<Person, 'name'>;

type PersonPageState = PageState<Person, number, PersonCreationData>;

describe(itemUpdateRequestedReducer, () => {
  it('ITEM_UPDATE_REQUESTED should set the item update data', () => {
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
    const itemUpdateData: Person = { id: 1, name: 'joe (new)' };
    const result = itemUpdateRequestedReducer(state, {
      type: 'ITEM_UPDATE_REQUESTED',
      itemUpdateData,
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
      itemUpdateData,
    };
    expect(result).toEqual(expectedState);
  });
});
