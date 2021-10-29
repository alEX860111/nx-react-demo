import { Loadable } from './loadable';
import { LoadableAction } from './loadable-action';

export function loadableReducer<T>(
  state: Loadable<T>,
  action: LoadableAction<T>
): Loadable<T> {
  switch (action.type) {
    case 'LOAD_INIT':
      return {
        ...state,
        isLoading: true,
        error: undefined,
      };
    case 'LOAD_SUCCESS':
      return {
        isLoading: false,
        error: undefined,
        data: action.data,
      };
    case 'LOAD_ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      throw new Error();
  }
}
