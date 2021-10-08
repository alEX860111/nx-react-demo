import { nanoid } from 'nanoid';
import { singleton } from 'tsyringe';
import { Page } from './page';
import { Todo } from './todo';
import { TodoCreationData } from './todo-creation-data';
import { TodoService } from './todo-service';

@singleton()
export class TodoMockService implements TodoService {
  private todoList: Todo[] = [];

  constructor() {
    this.addTodo({ content: 'wash car' });
    this.addTodo({ content: 'clean up room' });
    this.addTodo({ content: 'play videogames' });
    this.addTodo({ content: 'go shopping' });
    this.addTodo({ content: 'go to the doctor' });
    this.addTodo({ content: 'meet friends' });
  }

  private createPromise<T>(data: T): Promise<T> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(data), 1000);
    });
  }

  getTodos(pageIndex: number, pageSize: number): Promise<Page<Todo>> {
    const startIndex = pageIndex * pageSize;
    const endIndex = startIndex + pageSize;

    const page: Page<Todo> = {
      index: pageIndex,
      size: pageSize,
      items: this.todoList.slice(startIndex, endIndex),
      totalItems: this.todoList.length,
      totalPages: Math.ceil(this.todoList.length / pageSize),
    };
    return this.createPromise(page);
  }

  addTodo(todoCreationData: TodoCreationData): Promise<string> {
    const todo: Todo = {
      ...todoCreationData,
      id: nanoid(),
    };

    this.todoList = [todo, ...this.todoList];

    return this.createPromise(todo.id);
  }

  deleteTodo(todo: Todo): Promise<boolean> {
    this.todoList = this.todoList.filter(
      (existingTodo) => existingTodo.id !== todo.id
    );
    return this.createPromise(true);
  }
}
