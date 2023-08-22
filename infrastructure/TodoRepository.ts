import { PrismaClient } from '@prisma/client';
import { Todo } from '../domains/Todo';
import { injectable } from 'inversify';

@injectable()
export class TodoRepository {
    private prisma = new PrismaClient();

    async findAll(): Promise<Todo[]> {
        return this.prisma.todo.findMany();
    }

    async find(id: number): Promise<Todo | null> {
        return this.prisma.todo.findUnique({
            where: { id: id }
        });
    }

    async create(title: string): Promise<Todo> {
        return this.prisma.todo.create({
            data: {
                title: title,
                completed: false
            }
        });
    }

    async update(id: number, title: string, completed?: boolean): Promise<Todo | null> {
        return this.prisma.todo.update({
            where: { id: id },
            data: {
                title: title,
                completed: completed
            }
        });
    }

    async delete(id: number): Promise<void> {
        await this.prisma.todo.delete({
            where: { id: id }
        });
    }
}
