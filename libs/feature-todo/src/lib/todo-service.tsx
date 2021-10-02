import { InjectionToken } from 'tsyringe';
import { Todo } from './todo';
import { TodoCreationData } from './todo-creation-data';

export const TodoServiceDIToken: InjectionToken<TodoService> = 'TodoService';

export interface TodoService {
  getTodos(): Promise<Todo[]>;
  addTodo(todoCreationData: TodoCreationData): Promise<string>;
  deleteTodo(todo: Todo): Promise<void>;
}
