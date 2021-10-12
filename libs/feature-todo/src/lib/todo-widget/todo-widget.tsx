import {
  Page,
  Todo,
  TodoCreationData,
  TodoService,
  TodoServiceDIToken,
} from '@nx-react-demo/data-access-todo';
import { withInjection } from '@nx-react-demo/util-di';
import React from 'react';
import { TodoInput } from '../todo-input/todo-input';
import { TodoList } from '../todo-list/todo-list';

interface Props {
  todoService: TodoService;
  label: string;
}

interface State {
  todoPage: Page<Todo>;
  loading: boolean;
}

class TodoWidgetComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      todoPage: {
        index: 0,
        size: 5,
        items: [],
        totalItems: 0,
        totalPages: 0,
      },
      loading: false,
    };

    this.handleCreateTodo = this.handleCreateTodo.bind(this);
    this.handleDeleteTodo = this.handleDeleteTodo.bind(this);
    this.handlePageIndexChange = this.handlePageIndexChange.bind(this);
    this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.loadTodos(this.state.todoPage.index, this.state.todoPage.size);
  }

  private async handleCreateTodo(
    todoCreationData: TodoCreationData
  ): Promise<void> {
    const pageIndex = 0;
    this.setState((state) => ({
      loading: true,
      todoPage: { ...state.todoPage, index: pageIndex },
    }));
    await this.props.todoService.addTodo(todoCreationData);
    await this.loadTodos(pageIndex, this.state.todoPage.size);
  }

  private async handleDeleteTodo(todo: Todo): Promise<void> {
    this.setState({ loading: true });
    await this.props.todoService.deleteTodo(todo);
    await this.loadTodos(this.state.todoPage.index, this.state.todoPage.size);
  }

  private handlePageIndexChange(pageIndex: number) {
    this.setState((state) => ({
      loading: true,
      todoPage: { ...state.todoPage, index: pageIndex },
    }));
    this.loadTodos(pageIndex, this.state.todoPage.size);
  }

  private handlePageSizeChange(pageSize: number) {
    const pageIndex = 0;
    this.setState((state) => ({
      loading: true,
      todoPage: { ...state.todoPage, index: pageIndex, size: pageSize },
    }));
    this.loadTodos(pageIndex, pageSize);
  }

  private async loadTodos(pageIndex: number, pageSize: number): Promise<void> {
    return this.props.todoService
      .getTodos(pageIndex, pageSize)
      .then((todoPage) => this.setState({ todoPage, loading: false }));
  }

  render() {
    return (
      <>
        <h2>{this.props.label}</h2>
        <TodoInput onCreateTodo={this.handleCreateTodo}></TodoInput>
        <TodoList
          todoPage={this.state.todoPage}
          loading={this.state.loading}
          onDeleteTodo={this.handleDeleteTodo}
          onPageIndexChange={this.handlePageIndexChange}
          onPageSizeChange={this.handlePageSizeChange}
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
