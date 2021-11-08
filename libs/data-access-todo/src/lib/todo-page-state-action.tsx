import { PageStateAction } from '@nx-react-demo/util-data-access';
import { Todo } from './todo';
import { TodoCreationData } from './todo-creation-data';

export type TodoPageStateAction = PageStateAction<
  Todo,
  number,
  TodoCreationData
>;
