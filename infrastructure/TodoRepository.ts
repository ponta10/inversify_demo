import { PrismaClient } from '@prisma/client';
import { Todo } from '../domains/Todo';
import { injectable } from 'inversify';

@injectable()
export class TodoRepository {
    private prisma = new PrismaClient();

    async findAll(): Promise<Todo[]> {
        return this.prisma.todo.findMany();
    }

    async create(title: string): Promise<Todo> {
        return this.prisma.todo.create({
            data: {
                title: title,
                completed: false
            }
        });
    }
}
