import { Page } from './page';

export type CrudContainerAction<T, C> =
  | PageLoadInitAction
  | PageLoadSuccessAction<T>
  | PageLoadErrorAction
  | PageIndexChangeAction
  | PageSizeChangeAction
  | ItemCreationInitAction<C>
  | ItemCreationSuccessAction<T>
  | ItemCreationErrorAction;

export interface PageLoadInitAction {
  readonly type: 'PAGE_LOAD_INIT';
}

export interface PageLoadSuccessAction<T> {
  readonly type: 'PAGE_LOAD_SUCCESS';
  readonly page: Page<T>;
}

export interface PageLoadErrorAction {
  readonly type: 'PAGE_LOAD_ERROR';
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

export interface ItemCreationInitAction<C> {
  readonly type: 'ITEM_CREATION_INIT';
  readonly itemCreationData: C;
}

export interface ItemCreationSuccessAction<T> {
  readonly type: 'ITEM_CREATION_SUCCESS';
  readonly item: T;
}

export interface ItemCreationErrorAction {
  readonly type: 'ITEM_CREATION_ERROR';
  readonly error: string;
}
