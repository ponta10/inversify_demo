import { Todo } from '../domains/Todo';
import { injectable, inject } from 'inversify';
import { TodoRepository } from '../infrastructure/TodoRepository';
import TYPES from '../types';

@injectable()
export class TodoService {
    @inject(TYPES.TodoRepository) private todoRepository!: TodoRepository;

    async getAllTodos(): Promise<Todo[]> {
        return this.todoRepository.findAll();
    }

    async addTodo(title: string): Promise<Todo> {
        return this.todoRepository.create(title);
    }
}
