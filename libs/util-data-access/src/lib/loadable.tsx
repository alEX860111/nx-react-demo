export interface Loadable<T> {
  error?: any;
  isLoading: boolean;
  data: T;
}
