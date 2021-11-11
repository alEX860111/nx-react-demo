import { Reducer } from 'react';
import { PageState } from '../../page-state';
import { LoadErrorAction } from '../../page-state-action';
import { loadErrorReducer } from './load-error-reducer';

interface Person {
  id: number;
  name: string;
}

type PersonCreationData = Pick<Person, 'name'>;

type PersonPageState = PageState<Person, number, PersonCreationData>;

describe(loadErrorReducer, () => {
  const reducer: Reducer<PersonPageState, LoadErrorAction> = loadErrorReducer;

  it('should set the error and deactivate the loading state', () => {
    const state: PersonPageState = {
      loadablePage: {
        isLoading: true,
        data: { items: [], totalItems: 0, totalPages: 0 },
      },
      pageParams: {
        index: 0,
        size: 10,
      },
      refreshPage: 0,
    };
    const result = reducer(state, { type: 'LOAD_ERROR', error: 'oops' });
    const expectedState: PersonPageState = {
      loadablePage: {
        error: 'oops',
        isLoading: false,
        data: { items: [], totalItems: 0, totalPages: 0 },
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
