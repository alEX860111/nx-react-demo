import React from 'react';
import { Todo } from '../todo';
import { TodoInput } from '../todo-input/todo-input';
import { TodoList } from '../todo-list/todo-list';
import { TodoService } from '../todo-service';

// eslint-disable-next-line
interface Props {}

interface State {
  todoList: Todo[];
}

export class TodoWidget extends React.Component<Props, State> {
  private readonly todoService: TodoService;

  constructor(props: Props) {
    super(props);

    this.state = {
      todoList: [],
    };
    this.handleTodo = this.handleTodo.bind(this);

    this.todoService = new TodoService();
  }

  componentDidMount() {
    this.todoService.getTodos().then((todoList) => this.setState({ todoList }));
  }

  private async handleTodo(todo: Todo) {
    const newTodoList = await this.todoService.addTodo(todo);
    this.setState(() => ({ todoList: newTodoList }));
  }

  render() {
    return (
      <>
        <TodoInput handleTodo={this.handleTodo}></TodoInput>
        <TodoList todoList={this.state.todoList}></TodoList>
      </>
    );
  }
}
