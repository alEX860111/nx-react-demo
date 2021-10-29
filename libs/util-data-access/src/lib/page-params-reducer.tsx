import { PageParams } from './page-params';
import { PageParamsAction } from './page-params-action';

export function pageParamsReducer(
  state: PageParams,
  action: PageParamsAction
): PageParams {
  switch (action.type) {
    case 'PAGE_INDEX_CHANGE':
      return {
        ...state,
        index: action.pageIndex,
      };
    case 'PAGE_SIZE_CHANGE':
      return {
        ...state,
        size: action.pageSize,
        index: 0,
      };
    default:
      throw new Error();
  }
}
