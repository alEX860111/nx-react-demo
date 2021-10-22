export interface LoadAction {
  type: 'LOAD_INIT' | 'LOAD_SUCCESS' | 'LOAD_ERROR';
}

export class LoadInitAction implements LoadAction {
  type: 'LOAD_INIT';
}

export function isLoadInitAction(action: LoadAction): action is LoadInitAction {
  return action.type === 'LOAD_INIT';
}

export class LoadSuccessAction<T> implements LoadAction {
  type: 'LOAD_SUCCESS';
  data: T;
}

export function isLoadSuccessAction<T>(
  action: LoadAction
): action is LoadSuccessAction<T> {
  return action.type === 'LOAD_SUCCESS';
}

export class LoadErrorAction implements LoadAction {
  type: 'LOAD_ERROR';
  error: any;
}

export function isLoadErrorAction(
  action: LoadAction
): action is LoadErrorAction {
  return action.type === 'LOAD_ERROR';
}
