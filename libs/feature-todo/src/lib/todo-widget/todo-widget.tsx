import { withInjection } from '@nx-react-demo/util-di';
import React from 'react';
import { Page } from '../page';
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
  todoPage: Page<Todo>;
  loading: boolean;
}

class TodoWidgetComponent extends React.Component<Props, State> {
  private readonly pageSize = 2;

  constructor(props: Props) {
    super(props);

    this.state = {
      todoPage: {
        index: 0,
        size: this.pageSize,
        items: [],
        totalItems: 0,
        totalPages: 0,
      },
      loading: false,
    };

    this.handleTodoCreationData = this.handleTodoCreationData.bind(this);
    this.handleDeleteTodo = this.handleDeleteTodo.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.loadTodos(0, this.pageSize);
  }

  private async handleTodoCreationData(
    todoCreationData: TodoCreationData
  ): Promise<void> {
    this.setState({ loading: true });
    await this.props.todoService.addTodo(todoCreationData);
    await this.loadTodos(0, this.pageSize);
  }

  private async handleDeleteTodo(todo: Todo): Promise<void> {
    this.setState({ loading: true });
    await this.props.todoService.deleteTodo(todo);
    await this.loadTodos(this.state.todoPage.index, this.pageSize);
  }

  private async loadTodos(pageIndex: number, pageSize: number): Promise<void> {
    return this.props.todoService
      .getTodos(pageIndex, pageSize)
      .then((todoPage) => this.setState({ todoPage, loading: false }));
  }

  private handlePageChange(pageIndex: number) {
    this.setState({ loading: true });
    this.loadTodos(pageIndex, this.pageSize);
  }

  render() {
    return (
      <>
        <h2>{this.props.label}</h2>
        <TodoInput
          handleTodoCreationData={this.handleTodoCreationData}
        ></TodoInput>
        <TodoList
          todoPage={this.state.todoPage}
          loading={this.state.loading}
          onDeleteTodo={this.handleDeleteTodo}
          onPageChange={this.handlePageChange}
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
