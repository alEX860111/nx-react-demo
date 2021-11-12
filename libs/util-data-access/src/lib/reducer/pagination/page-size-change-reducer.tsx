import { Item } from '../../item';
import { PageState } from '../../page-state';
import { PageSizeChangeAction } from '../../page-state-action';

export function pageSizeChangeReducer<T extends Item<ID>, ID, C, F>(
  state: PageState<T, ID, C, F>,
  action: PageSizeChangeAction
): PageState<T, ID, C, F> {
  return {
    ...state,
    pageParams: {
      ...state.pageParams,
      size: action.pageSize,
      index: 0,
    },
  };
}
