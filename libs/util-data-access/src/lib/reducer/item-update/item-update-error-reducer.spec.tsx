import { PageState } from '../../page-state';
import { itemUpdateErrorReducer } from './item-update-error-reducer';

interface Person {
  id: number;
  name: string;
}

type PersonCreationData = Pick<Person, 'name'>;

type PersonFilter = Partial<Pick<Person, 'name'>>;

type PersonPageState = PageState<
  Person,
  number,
  PersonCreationData,
  PersonFilter
>;

describe(itemUpdateErrorReducer, () => {
  it('should increment the refresh counter', () => {
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
      itemUpdateData: { id: 1, name: 'joe (new)' },
      filter: {},
    };

    const result = itemUpdateErrorReducer(state, { type: 'ITEM_UPDATE_ERROR' });

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
      refreshPage: 1,
      itemUpdateData: { id: 1, name: 'joe (new)' },
      filter: {},
    };
    expect(result).toEqual(expectedState);
  });
});
