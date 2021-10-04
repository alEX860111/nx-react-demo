import { withInjection } from '@nx-react-demo/util-di';
import React from 'react';
import { Todo } from '../todo';
import { TodoCreationData } from '../todo-creation-data';
import { TodoInput } from '../todo-input/todo-input';
import { TodoList } from '../todo-list/todo-list';
import { TodoService, TodoServiceDIToken } from '../todo-service';

interface Props {
  todoService: TodoService;
  label: string;
}

interface State {
  todoList: Todo[];
  loading: boolean;
}

class TodoWidgetComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      todoList: [],
      loading: false,
    };

    this.handleTodoCreationData = this.handleTodoCreationData.bind(this);
    this.handleDeleteTodo = this.handleDeleteTodo.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.loadTodos();
  }

  private async handleTodoCreationData(
    todoCreationData: TodoCreationData
  ): Promise<void> {
    this.setState({ loading: true });
    await this.props.todoService.addTodo(todoCreationData);
    await this.loadTodos();
  }

  private async handleDeleteTodo(todo: Todo): Promise<void> {
    this.setState({ loading: true });
    await this.props.todoService.deleteTodo(todo);
    await this.loadTodos();
  }

  private async loadTodos(): Promise<void> {
    return this.props.todoService
      .getTodos()
      .then((todoList) => this.setState({ todoList, loading: false }));
  }

  render() {
    return (
      <>
        <h2>{this.props.label}</h2>
        <TodoInput
          handleTodoCreationData={this.handleTodoCreationData}
        ></TodoInput>
        <TodoList
          todoList={this.state.todoList}
          loading={this.state.loading}
          handleDeleteTodo={this.handleDeleteTodo}
        ></TodoList>
      </>
    );
  }
}

type InjectedProps = Pick<Props, 'todoService'>;

export const TodoWidget = withInjection<Props, InjectedProps>(
  TodoWidgetComponent,
  {
    todoService: TodoServiceDIToken,
  }
);
