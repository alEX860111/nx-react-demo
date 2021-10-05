import { registry } from 'tsyringe';
import { TodoMockService } from './todo-mock-service';
import { TodoServiceDIToken } from './todo-service';

@registry([{ token: TodoServiceDIToken, useClass: TodoMockService }])
export class TodoDIRegistry {}
