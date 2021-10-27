import { Reducer } from 'react';
import { CrudContainer } from './crud-container';
import { LoadAction } from './load-action';

export function loadableReducer<T, C>(): Reducer<
  CrudContainer<T, C>,
  LoadAction<T, C>
> {
  return (
    state: CrudContainer<T, C>,
    action: LoadAction<T, C>
  ): CrudContainer<T, C> => {
    switch (action.type) {
      case 'LOAD_INIT':
        return {
          ...state,
          loadablePage: {
            ...state.loadablePage,
            isLoading: true,
            error: false,
          },
        };
      case 'LOAD_SUCCESS':
        return {
          ...state,
          loadablePage: {
            isLoading: false,
            error: false,
            data: action.data,
          },
        };
      case 'LOAD_ERROR':
        return {
          ...state,
          loadablePage: {
            ...state.loadablePage,
            isLoading: false,
            error: action.error,
          },
        };
      case 'PAGE_INDEX_CHANGE':
        return {
          ...state,
          loadablePage: {
            ...state.loadablePage,
            data: {
              ...state.loadablePage.data,
              index: action.pageIndex,
            },
          },
        };
      case 'PAGE_SIZE_CHANGE':
        return {
          ...state,
          loadablePage: {
            ...state.loadablePage,
            data: {
              ...state.loadablePage.data,
              size: action.pageSize,
              index: 0,
            },
          },
        };
      case 'CREATE_INIT':
        return {
          ...state,
          itemCreationData: action.data,
          loadablePage: {
            ...state.loadablePage,
            isLoading: true,
            error: false,
          },
        };
      case 'CREATE_SUCCESS':
        return {
          ...state,
          createdItem: action.data,
          loadablePage: {
            ...state.loadablePage,
            data: {
              ...state.loadablePage.data,
              index: 0,
            },
          },
        };
      default:
        throw new Error();
    }
  };
}
