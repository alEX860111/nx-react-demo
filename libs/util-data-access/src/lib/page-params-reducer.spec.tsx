import { Reducer } from 'react';
import { PageParams } from './page-params';
import { PageParamsAction } from './page-params-action';
import { pageParamsReducer } from './page-params-reducer';

describe(pageParamsReducer, () => {
  const reducer: Reducer<PageParams, PageParamsAction> = pageParamsReducer;

  it('should set the page index on PAGE_INDEX_CHANGE action', () => {
    const state: PageParams = {
      index: 0,
      size: 10,
    };
    const result = reducer(state, { type: 'PAGE_INDEX_CHANGE', pageIndex: 1 });
    const expectedState: PageParams = {
      index: 1,
      size: 10,
    };
    expect(result).toEqual(expectedState);
  });

  it('should set the page size and reset the page index on PAGE_SIZE_CHANGE action', () => {
    const state: PageParams = {
      index: 42,
      size: 10,
    };
    const result = reducer(state, { type: 'PAGE_SIZE_CHANGE', pageSize: 20 });
    const expectedState: PageParams = {
      index: 0,
      size: 20,
    };
    expect(result).toEqual(expectedState);
  });
});
