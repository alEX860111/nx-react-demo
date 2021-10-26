import { Reducer } from 'react';
import { LoadAction } from './load-action';
import { Loadable } from './loadable';
import { Page } from './page';

export function loadableReducer<T>(): Reducer<
  Loadable<Page<T>>,
  LoadAction<T>
> {
  return (
    state: Loadable<Page<T>>,
    action: LoadAction<T>
  ): Loadable<Page<T>> => {
    switch (action.type) {
      case 'LOAD_INIT':
        return { ...state, isLoading: true, error: false };
      case 'LOAD_SUCCESS':
        return {
          ...state,
          isLoading: false,
          error: false,
          data: action.data,
        };
      case 'LOAD_ERROR':
        return {
          ...state,
          isLoading: false,
          error: action.error,
        };
      case 'PAGE_INDEX_CHANGE':
        return { ...state, data: { ...state.data, index: action.pageIndex } };
      case 'PAGE_SIZE_CHANGE':
        return {
          ...state,
          data: { ...state.data, size: action.pageSize, index: 0 },
        };
      default:
        throw new Error();
    }
  };
}
