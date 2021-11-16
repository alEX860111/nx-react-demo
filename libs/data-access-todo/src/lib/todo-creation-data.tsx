import { Todo } from './todo';

export type TodoCreationData = Pick<Todo, 'content' | 'completed'>;
