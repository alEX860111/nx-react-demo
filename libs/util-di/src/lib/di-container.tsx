import { container } from 'tsyringe';
import { DIRegistration } from './di-registration';

export function configureDIContainer(
  registrations: DIRegistration<unknown>[]
): void {
  registrations.forEach((registration) => {
    if (container.isRegistered(registration.token)) {
      throw new Error(
        `duplicate DI registration found: '${registration.token.toString()}'`
      );
    }
    container.register(registration.token, registration.provider);
  });
}
