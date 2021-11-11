import { PageState } from '../../page-state';
import { refreshPageReducer } from './refresh-page-reducer';

interface Person {
  id: number;
  name: string;
}

type PersonCreationData = Pick<Person, 'name'>;

type PersonPageState = PageState<Person, number, PersonCreationData>;

describe(refreshPageReducer, () => {
  it('should increment the refresh counter', () => {
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
      itemUpdateData: { id: 1, name: 'joe (new)' },
    };
    const result = refreshPageReducer(state, { type: 'REFRESH_PAGE' });
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
      refreshPage: 1,
      itemUpdateData: { id: 1, name: 'joe (new)' },
    };
    expect(result).toEqual(expectedState);
  });
});
