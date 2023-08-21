import "reflect-metadata";
import { Container } from 'inversify';
import TYPES from './types';
import { TodoService } from './application/TodoService';
import { TodoRepository } from './infrastructure/TodoRepository';

const container = new Container();
container.bind<TodoService>(TYPES.TodoService).to(TodoService);
container.bind<TodoRepository>(TYPES.TodoRepository).to(TodoRepository);

export default container;
