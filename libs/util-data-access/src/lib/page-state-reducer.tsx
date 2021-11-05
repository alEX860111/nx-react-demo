import { Item } from './item';
import { PageState } from './page-state';
import { PageStateAction } from './page-state-action';

export function pageStateReducer<T extends Item<ID>, ID, C>(
  state: PageState<T, ID, C>,
  action: PageStateAction<T, ID, C>
): PageState<T, ID, C> {
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
    case 'ITEM_CREATION_REQUESTED':
      return {
        ...state,
        itemCreationData: action.itemCreationData,
      };
    case 'ITEM_CREATION_SUCCESS':
      return {
        ...state,
        pageParams: {
          ...state.pageParams,
          index: 0,
        },
        refreshPage: state.refreshPage + 1,
      };
    case 'ITEM_DELETION_REQUESTED':
      return {
        ...state,
        loadablePage: {
          ...state.loadablePage,
          isLoading: true,
        },
        itemIdToDelete: action.itemIdToDelete,
      };
    case 'ITEM_DELETION_SUCCESS':
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
        refreshPage: state.refreshPage + 1,
      };
    case 'ITEM_DELETION_ERROR':
      return {
        ...state,
        loadablePage: {
          ...state.loadablePage,
          isLoading: false,
        },
      };
    case 'ITEM_UPDATE_REQUESTED':
      return {
        ...state,
        itemUpdateData: action.itemUpdateData,
      };
    case 'REFRESH_PAGE':
      return {
        ...state,
        refreshPage: state.refreshPage + 1,
      };
    default:
      throw new Error();
  }
}
