import { PageState } from '@nx-react-demo/util-data-access';
import { Todo } from './todo';
import { TodoCreationData } from './todo-creation-data';

export type TodoPageState = PageState<Todo, number, TodoCreationData>;
