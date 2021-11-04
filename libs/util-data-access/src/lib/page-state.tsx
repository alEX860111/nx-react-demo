import { Loadable } from './loadable';
import { Page } from './page';
import { PageParams } from './page-params';

export interface PageState<C, R, D> {
  loadablePage: Loadable<Page<R>>;
  pageParams: PageParams;
  itemCreationData?: C;
  itemDeletiondata?: D;
  itemUpdateData?: R;
  refreshPage: number;
}
