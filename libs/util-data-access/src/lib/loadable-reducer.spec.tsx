import { Reducer } from 'react';
import { Loadable } from './loadable';
import { LoadableAction } from './loadable-action';
import { loadableReducer } from './loadable-reducer';

describe(loadableReducer, () => {
  const reducer: Reducer<
    Loadable<string>,
    LoadableAction<string>
  > = loadableReducer;

  it('should erase the error and activate the loading state on LOAD_INIT action', () => {
    const state: Loadable<string> = {
      error: 'oops',
      isLoading: false,
      data: '',
    };
    const result = reducer(state, { type: 'LOAD_INIT' });
    const expectedState: Loadable<string> = {
      error: undefined,
      isLoading: true,
      data: '',
    };
    expect(result).toEqual(expectedState);
  });

  it('should erase the error, deactivate the loading state and set the page on LOAD_SUCCESS action', () => {
    const state: Loadable<string> = {
      isLoading: true,
      data: '',
    };
    const result = reducer(state, { type: 'LOAD_SUCCESS', data: 'joe' });
    const expectedState: Loadable<string> = {
      isLoading: false,
      data: 'joe',
    };
    expect(result).toEqual(expectedState);
  });

  it('should set the error and deactivate the loading state on LOAD_ERROR action', () => {
    const state: Loadable<string> = {
      isLoading: true,
      data: '',
    };
    const result = reducer(state, { type: 'LOAD_ERROR', error: 'oops' });
    const expectedState: Loadable<string> = {
      error: 'oops',
      isLoading: false,
      data: '',
    };
    expect(result).toEqual(expectedState);
  });
});
