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

  getTodos(): Promise<Todo[]> {
    return Promise.resolve(this.todoList);
  }

  addTodo(todoCreationData: TodoCreationData): Promise<string> {
    const todo: Todo = {
      ...todoCreationData,
      id: nanoid(),
    };

    this.todoList.push(todo);

    return Promise.resolve(todo.id);
  }
}
