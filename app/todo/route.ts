import { NextApiRequest, NextApiResponse } from 'next';
import container from '../../inversify.config';
import TYPES from '../../types';
import { TodoService } from '../../application/TodoService';

const todoService = container.get<TodoService>(TYPES.TodoService);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const todos = await todoService.getAllTodos();
        res.status(200).json(todos);
    } else if (req.method === 'POST') {
        const { title } = req.body;
        const newTodo = await todoService.addTodo(title);
        res.status(201).json(newTodo);
    }
}
