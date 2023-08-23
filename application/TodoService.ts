import { Todo } from '../domains/Todo';
import { injectable, inject } from 'inversify';
import { TodoRepository } from '../infrastructure/TodoRepository';
import TYPES from '../types';

@injectable()
export class TodoService {
    @inject(TYPES.TodoRepository) private todoRepository!: TodoRepository;

    // constructor()を使う場合
    // private todoRepository: TodoRepository;
    // constructor(@inject(TYPES.TodoRepository) todoRepository: TodoRepository) {
    //     this.todoRepository = todoRepository;
    // }

    async getAllTodos(): Promise<Todo[]> {
        return this.todoRepository.findAll();
    }

    async getTodo(id: number): Promise<Todo | null> {
        return this.todoRepository.find(id);
    }

    async addTodo(title: string): Promise<Todo> {
        return this.todoRepository.create(title);
    }

    async updateTodo(id: number, title: string): Promise<Todo | null> {
        return this.todoRepository.update(id, title);
    }

    async deleteTodo(id: number): Promise<void> {
        return this.todoRepository.delete(id);
    }
}
