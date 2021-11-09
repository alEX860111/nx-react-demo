import { Item } from './item';
import { Page } from './page';

export type PageStateAction<T extends Item<ID>, ID, C> =
  | LoadInitAction
  | LoadSuccessAction<T>
  | LoadErrorAction
  | PageIndexChangeAction
  | PageSizeChangeAction
  | ItemCreationRequestedAction<C>
  | ItemCreationSuccessAction
  | ItemCreationErrorAction
  | ItemDeletionRequestedAction<ID>
  | ItemDeletionSuccessAction
  | ItemDeletionErrorAction
  | ItemUpdateRequestedAction<T>
  | RefreshPageAction;

export interface LoadInitAction {
  readonly type: 'LOAD_INIT';
}

export interface LoadSuccessAction<T> {
  readonly type: 'LOAD_SUCCESS';
  readonly page: Page<T>;
}

export interface LoadErrorAction {
  readonly type: 'LOAD_ERROR';
  readonly error: string;
}

export interface PageIndexChangeAction {
  readonly type: 'PAGE_INDEX_CHANGE';
  readonly pageIndex: number;
}

export interface PageSizeChangeAction {
  readonly type: 'PAGE_SIZE_CHANGE';
  readonly pageSize: number;
}

export interface ItemCreationRequestedAction<T> {
  readonly type: 'ITEM_CREATION_REQUESTED';
  readonly itemCreationData: T;
}

export interface ItemCreationSuccessAction {
  readonly type: 'ITEM_CREATION_SUCCESS';
}

export interface ItemCreationErrorAction {
  readonly type: 'ITEM_CREATION_ERROR';
}

export interface ItemDeletionRequestedAction<T> {
  readonly type: 'ITEM_DELETION_REQUESTED';
  readonly itemIdToDelete: T;
}

export interface ItemDeletionSuccessAction {
  readonly type: 'ITEM_DELETION_SUCCESS';
}

export interface ItemDeletionErrorAction {
  readonly type: 'ITEM_DELETION_ERROR';
}

export interface ItemUpdateRequestedAction<T> {
  readonly type: 'ITEM_UPDATE_REQUESTED';
  readonly itemUpdateData: T;
}

export interface RefreshPageAction {
  readonly type: 'REFRESH_PAGE';
}
