import { DIRegistration } from '@nx-react-demo/util-di';
import { TodoMockService } from './todo-mock-service';
import { TodoServiceDIToken } from './todo-service';

export const todoDIRegistrations: DIRegistration<unknown>[] = [
  {
    token: TodoServiceDIToken,
    provider: { useClass: TodoMockService },
  },
];
