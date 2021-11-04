import { Page } from './page';

export type PageStateAction<C, R, D> =
  | LoadInitAction
  | LoadSuccessAction<R>
  | LoadErrorAction
  | PageIndexChangeAction
  | PageSizeChangeAction
  | ItemCreationRequestedAction<C>
  | ItemCreationSuccessAction
  | ItemDeletionRequestedAction<D>
  | ItemDeletionSuccessAction
  | ItemUpdateRequestedAction<R>
  | RefreshPageAction;

export interface LoadInitAction {
  readonly type: 'LOAD_INIT';
}

export interface LoadSuccessAction<R> {
  readonly type: 'LOAD_SUCCESS';
  readonly page: Page<R>;
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

export interface ItemCreationRequestedAction<C> {
  readonly type: 'ITEM_CREATION_REQUESTED';
  readonly itemCreationData: C;
}

export interface ItemCreationSuccessAction {
  readonly type: 'ITEM_CREATION_SUCCESS';
}

export interface ItemDeletionRequestedAction<D> {
  readonly type: 'ITEM_DELETION_REQUESTED';
  readonly itemDeletiondata: D;
}

export interface ItemDeletionSuccessAction {
  readonly type: 'ITEM_DELETION_SUCCESS';
}

export interface ItemUpdateRequestedAction<R> {
  readonly type: 'ITEM_UPDATE_REQUESTED';
  readonly itemUpdateData: R;
}

export interface RefreshPageAction {
  readonly type: 'REFRESH_PAGE';
}
