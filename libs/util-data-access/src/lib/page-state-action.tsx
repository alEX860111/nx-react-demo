import { Page } from './page';

export type PageStateAction<T> =
  | LoadInitAction
  | LoadSuccessAction<T>
  | LoadErrorAction
  | PageIndexChangeAction
  | PageSizeChangeAction
  | ItemCreatedAction
  | ItemDeletedAction;

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

export interface ItemCreatedAction {
  readonly type: 'ITEM_CREATED';
}

export interface ItemDeletedAction {
  readonly type: 'ITEM_DELETED';
}
