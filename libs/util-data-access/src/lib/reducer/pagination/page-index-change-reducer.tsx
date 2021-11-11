import { Item } from '../../item';
import { PageState } from '../../page-state';
import { PageIndexChangeAction } from '../../page-state-action';

export function pageIndexChangeReducer<T extends Item<ID>, ID, C>(
  state: PageState<T, ID, C>,
  action: PageIndexChangeAction
): PageState<T, ID, C> {
  return {
    ...state,
    pageParams: {
      ...state.pageParams,
      index: action.pageIndex,
    },
  };
}
