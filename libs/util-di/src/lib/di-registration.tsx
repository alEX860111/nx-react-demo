import { ClassProvider, InjectionToken } from 'tsyringe';

export interface DIRegistration<T> {
  token: InjectionToken<T>;
  provider: ClassProvider<T>;
}
