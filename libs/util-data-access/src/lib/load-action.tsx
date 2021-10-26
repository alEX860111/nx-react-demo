import { Page } from './page';

export type LoadAction<T> =
  | LoadInitAction
  | LoadSuccessAction<T>
  | LoadErrorAction
  | PageIndexChangeAction
  | PageSizeChangeAction;

export interface LoadInitAction {
  readonly type: 'LOAD_INIT';
}

export interface LoadSuccessAction<T> {
  readonly type: 'LOAD_SUCCESS';
  readonly data: Page<T>;
}

export interface LoadErrorAction {
  readonly type: 'LOAD_ERROR';
  readonly error: any;
}

export interface PageIndexChangeAction {
  readonly type: 'PAGE_INDEX_CHANGE';
  readonly pageIndex: number;
}

export interface PageSizeChangeAction {
  readonly type: 'PAGE_SIZE_CHANGE';
  readonly pageSize: number;
}
