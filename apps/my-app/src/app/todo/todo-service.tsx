import { Todo } from './todo';

export class TodoService {
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
