import { NextApiRequest, NextApiResponse } from 'next';
import container from '../../inversify.config';
import TYPES from '../../types';
import { TodoService } from '../../application/TodoService';
import { NextResponse } from 'next/server';

const todoService = container.get<TodoService>(TYPES.TodoService);

export async function GET() {
    const todos = await todoService.getAllTodos();
    return NextResponse.json(todos)
}


export async function POST(req: Request) {
    const { title } = await req.json();
    const newTodo = await todoService.addTodo(title);
    return NextResponse.json(newTodo);
}
