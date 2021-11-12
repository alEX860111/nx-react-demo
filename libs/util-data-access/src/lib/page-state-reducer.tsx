import { Item } from './item';
import { PageState } from './page-state';
import { PageStateAction } from './page-state-action';
import { itemCreationErrorReducer } from './reducer/item-creation/item-creation-error-reducer';
import { itemCreationRequestedReducer } from './reducer/item-creation/item-creation-requested-reducer';
import { itemCreationSuccessReducer } from './reducer/item-creation/item-creation-success-reducer';
import { itemDeletionErrorReducer } from './reducer/item-deletion/item-deletion-error-reducer';
import { itemDeletionRequestedReducer } from './reducer/item-deletion/item-deletion-requested-reducer';
import { itemDeletionSuccessReducer } from './reducer/item-deletion/item-deletion-success-reducer';
import { itemUpdateErrorReducer } from './reducer/item-update/item-update-error-reducer';
import { itemUpdateRequestedReducer } from './reducer/item-update/item-update-requested-reducer';
import { itemUpdateSuccessReducer } from './reducer/item-update/item-update-success-reducer';
import { itemFilterRequestedReducer } from './reducer/items-filter/item-filter-requested-reducer';
import { loadErrorReducer } from './reducer/items-load/load-error-reducer';
import { loadInitReducer } from './reducer/items-load/load-init-reducer';
import { loadSuccessReducer } from './reducer/items-load/load-success-reducer';
import { pageIndexChangeReducer } from './reducer/pagination/page-index-change-reducer';
import { pageSizeChangeReducer } from './reducer/pagination/page-size-change-reducer';

export function pageStateReducer<T extends Item<ID>, ID, C, F>(
  state: PageState<T, ID, C, F>,
  action: PageStateAction<T, ID, C, F>
): PageState<T, ID, C, F> {
  switch (action.type) {
    case 'LOAD_INIT':
      return loadInitReducer(state, action);
    case 'LOAD_SUCCESS':
      return loadSuccessReducer(state, action);
    case 'LOAD_ERROR':
      return loadErrorReducer(state, action);
    case 'PAGE_INDEX_CHANGE':
      return pageIndexChangeReducer(state, action);
    case 'PAGE_SIZE_CHANGE':
      return pageSizeChangeReducer(state, action);
    case 'ITEM_CREATION_REQUESTED':
      return itemCreationRequestedReducer(state, action);
    case 'ITEM_CREATION_SUCCESS':
      return itemCreationSuccessReducer(state, action);
    case 'ITEM_CREATION_ERROR':
      return itemCreationErrorReducer(state, action);
    case 'ITEM_DELETION_REQUESTED':
      return itemDeletionRequestedReducer(state, action);
    case 'ITEM_DELETION_SUCCESS':
      return itemDeletionSuccessReducer(state, action);
    case 'ITEM_DELETION_ERROR':
      return itemDeletionErrorReducer(state, action);
    case 'ITEM_UPDATE_REQUESTED':
      return itemUpdateRequestedReducer(state, action);
    case 'ITEM_UPDATE_SUCCESS':
      return itemUpdateSuccessReducer(state, action);
    case 'ITEM_UPDATE_ERROR':
      return itemUpdateErrorReducer(state, action);
    case 'ITEM_FILTER_REQUESTED':
      return itemFilterRequestedReducer(state, action);
    default:
      throw new Error();
  }
}
