export interface Loadable<T> {
  error?: string;
  isLoading: boolean;
  data: T;
}
