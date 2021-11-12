import { Item } from '../../item';
import { PageState } from '../../page-state';
import { PageIndexChangeAction } from '../../page-state-action';

export function pageIndexChangeReducer<T extends Item<ID>, ID, C, F>(
  state: PageState<T, ID, C, F>,
  action: PageIndexChangeAction
): PageState<T, ID, C, F> {
  return {
    ...state,
    pageParams: {
      ...state.pageParams,
      index: action.pageIndex,
    },
  };
}
