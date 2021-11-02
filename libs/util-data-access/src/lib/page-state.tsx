import { Loadable } from './loadable';
import { Page } from './page';
import { PageParams } from './page-params';

export interface PageState<T> {
  loadablePage: Loadable<Page<T>>;
  pageParams: PageParams;
}
