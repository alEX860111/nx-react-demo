import { nanoid } from 'nanoid';
import { singleton } from 'tsyringe';
import { Todo } from './todo';
import { TodoCreationData } from './todo-creation-data';
import { TodoService } from './todo-service';

@singleton()
export class TodoMockService implements TodoService {
  private todoList: Todo[] = [];

  constructor() {
    this.addTodo({ content: 'foo' });
    this.addTodo({ content: 'bar' });
  }

  private createPromise<T>(data: T): Promise<T> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(data), 1000);
    });
  }

  getTodos(): Promise<Todo[]> {
    return this.createPromise(this.todoList);
  }

  addTodo(todoCreationData: TodoCreationData): Promise<string> {
    const todo: Todo = {
      ...todoCreationData,
      id: nanoid(),
    };

    this.todoList = [...this.todoList, todo];

    return this.createPromise(todo.id);
  }

  deleteTodo(todo: Todo): Promise<boolean> {
    this.todoList = this.todoList.filter(
      (existingTodo) => existingTodo.id !== todo.id
    );
    return this.createPromise(true);
  }
}
