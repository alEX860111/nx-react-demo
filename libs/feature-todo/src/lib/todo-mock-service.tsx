import { singleton } from 'tsyringe';
import { Todo } from './todo';
import { TodoCreationData } from './todo-creation-data';
import { TodoService } from './todo-service';

@singleton()
export class TodoMockService implements TodoService {
  private todoList: Todo[] = [
    { id: 1, content: 'foo' },
    { id: 2, content: 'bar' },
  ];

  getTodos(): Promise<Todo[]> {
    return Promise.resolve(this.todoList);
  }

  addTodo(todoCreationData: TodoCreationData): Promise<number> {
    const todo: Todo = {
      ...todoCreationData,
      id: Math.random(),
    };

    this.todoList.push(todo);

    return Promise.resolve(todo.id);
  }
}
