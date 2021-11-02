import { PageState } from './page-state';
import { PageStateAction } from './page-state-action';

export function pageStateReducer<T>(
  state: PageState<T>,
  action: PageStateAction<T>
): PageState<T> {
  switch (action.type) {
    case 'LOAD_INIT':
      return {
        ...state,
        loadablePage: {
          ...state.loadablePage,
          isLoading: true,
          error: undefined,
        },
      };
    case 'LOAD_SUCCESS':
      return {
        ...state,
        loadablePage: {
          isLoading: false,
          error: undefined,
          data: action.page,
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
        pageParams: {
          ...state.pageParams,
          index: action.pageIndex,
        },
      };
    case 'PAGE_SIZE_CHANGE':
      return {
        ...state,
        pageParams: {
          ...state.pageParams,
          size: action.pageSize,
          index: 0,
        },
      };
    case 'ITEM_CREATED':
      return {
        ...state,
        pageParams: {
          ...state.pageParams,
          index: 0,
        },
      };
    case 'ITEM_DELETED':
      return {
        ...state,
        pageParams: {
          ...state.pageParams,
          index:
            state.loadablePage.data.items.length === 1 &&
            state.loadablePage.data.totalPages > 0
              ? state.pageParams.index - 1
              : state.pageParams.index,
        },
      };
    default:
      throw new Error();
  }
}
