import { InjectionToken } from 'tsyringe';
import { Todo } from './todo';

export const TodoServiceDIToken: InjectionToken<TodoService> = 'TodoService';

export interface TodoService {
  getTodos(): Promise<Todo[]>;
  addTodo(todo: Todo): Promise<Todo[]>;
}
