export type LoadableAction<T> =
  | LoadInitAction
  | LoadSuccessAction<T>
  | LoadErrorAction;

export interface LoadInitAction {
  readonly type: 'LOAD_INIT';
}

export interface LoadSuccessAction<T> {
  readonly type: 'LOAD_SUCCESS';
  readonly data: T;
}

export interface LoadErrorAction {
  readonly type: 'LOAD_ERROR';
  readonly error: string;
}
