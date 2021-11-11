import { PageState } from '../../page-state';
import { itemCreationSuccessReducer } from './item-creation-success-reducer';

interface Person {
  id: number;
  name: string;
}

type PersonCreationData = Pick<Person, 'name'>;

type PersonPageState = PageState<Person, number, PersonCreationData>;

describe(itemCreationSuccessReducer, () => {
  it('should reset the page index and increment the refresh counter', () => {
    const state: PersonPageState = {
      loadablePage: {
        isLoading: true,
        data: {
          items: [{ id: 2, name: 'zoe' }],
          totalItems: 2,
          totalPages: 2,
        },
      },
      pageParams: {
        index: 1,
        size: 1,
      },
      refreshPage: 0,
      itemCreationData: { name: 'joe' },
    };
    const result = itemCreationSuccessReducer(state, {
      type: 'ITEM_CREATION_SUCCESS',
    });
    const expectedState: PersonPageState = {
      loadablePage: {
        isLoading: true,
        data: {
          items: [{ id: 2, name: 'zoe' }],
          totalItems: 2,
          totalPages: 2,
        },
      },
      pageParams: {
        index: 0,
        size: 1,
      },
      refreshPage: 1,
      itemCreationData: { name: 'joe' },
    };
    expect(result).toEqual(expectedState);
  });
});
