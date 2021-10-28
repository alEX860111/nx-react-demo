import { Reducer } from 'react';
import { CrudContainer } from './crud-container';
import { CrudContainerAction } from './crud-container-action';

export function crudContainerReducer<T, C>(): Reducer<
  CrudContainer<T, C>,
  CrudContainerAction<T, C>
> {
  return (
    state: CrudContainer<T, C>,
    action: CrudContainerAction<T, C>
  ): CrudContainer<T, C> => {
    switch (action.type) {
      case 'PAGE_LOAD_INIT':
        return {
          ...state,
          loadablePage: {
            ...state.loadablePage,
            isLoading: true,
            error: undefined,
          },
        };
      case 'PAGE_LOAD_SUCCESS':
        return {
          ...state,
          loadablePage: {
            isLoading: false,
            error: undefined,
            data: action.page,
          },
        };
      case 'PAGE_LOAD_ERROR':
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
      case 'ITEM_CREATION_INIT':
        return {
          ...state,
          itemCreationData: action.itemCreationData,
          loadablePage: {
            ...state.loadablePage,
            isLoading: true,
            error: undefined,
          },
        };
      case 'ITEM_CREATION_SUCCESS':
        return {
          ...state,
          createdItem: action.item,
          loadablePage: {
            ...state.loadablePage,
            data: {
              ...state.loadablePage.data,
              index: 0,
            },
          },
        };
      case 'ITEM_CREATION_ERROR':
        return {
          ...state,
          loadablePage: {
            ...state.loadablePage,
            isLoading: false,
          },
        };
      default:
        throw new Error();
    }
  };
}
