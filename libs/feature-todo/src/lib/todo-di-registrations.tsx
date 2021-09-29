import { DIRegistration } from '@nx-react-demo/util-di';
import { TodoMockService } from './todo-mock-service';

export const todoDIRegistrations: DIRegistration<unknown>[] = [
  {
    token: 'foo',
    provider: { useClass: TodoMockService },
  },
];
