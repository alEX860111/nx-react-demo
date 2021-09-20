import { Todo } from './todo';

export interface TodoService {
  getTodos(): Promise<Todo[]>;
  addTodo(todo: Todo): Promise<Todo[]>;
}
