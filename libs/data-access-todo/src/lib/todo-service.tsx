import { InjectionToken } from 'tsyringe';
import { Page } from './page';
import { Todo } from './todo';
import { TodoCreationData } from './todo-creation-data';

export const TodoServiceDIToken: InjectionToken<TodoService> = 'TodoService';

export interface TodoService {
  getTodos(pageIndex: number, pageSize: number): Promise<Page<Todo>>;
  addTodo(todoCreationData: TodoCreationData): Promise<string>;
  deleteTodo(todo: Todo): Promise<boolean>;
}
