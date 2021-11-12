import { Item } from './item';
import { Loadable } from './loadable';
import { Page } from './page';
import { PageParams } from './page-params';

export interface PageState<T extends Item<ID>, ID, C, F> {
  loadablePage: Loadable<Page<T>>;
  pageParams: PageParams;
  itemCreationData?: C;
  itemIdToDelete?: ID;
  itemUpdateData?: {
    item: T;
    requiresPageRefresh: boolean;
  };
  refreshPage: number;
  filter: F;
}
