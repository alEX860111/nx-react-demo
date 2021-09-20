import { injectable } from 'inversify';
import { Todo } from './todo';
import { TodoService } from './todo-service';

@injectable()
export class TodoMockService implements TodoService {
  private todoList: Todo[] = [
    { id: 1, content: 'foo' },
    { id: 2, content: 'bar' },
  ];

  getTodos(): Promise<Todo[]> {
    return Promise.resolve(this.todoList);
  }

  addTodo(todo: Todo): Promise<Todo[]> {
    const newTodoList: Todo[] = this.todoList.map((todo: Todo) => ({
      ...todo,
    }));
    newTodoList.push(todo);
    this.todoList = newTodoList;

    return this.getTodos();
  }
}
