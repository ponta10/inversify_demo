import { TodoService } from "@/application/TodoService";
import container from "@/inversify.config";
import TYPES from "@/types";
import { NextResponse } from "next/server";

const todoService = container.get<TodoService>(TYPES.TodoService);

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const id = params.id;
    const todo = await todoService.getTodo(Number(id));

    if (todo) {
        return NextResponse.json(todo);
    } else {
        return NextResponse.json(new Error("Not found"), { status: 404 });
    }
}

export async function PUT(req: Request, { params }: { params: { id: number } }) {
    const { title } = await req.json();
    const updatedTodo = await todoService.updateTodo(
        Number(params.id),
        title
    );

    if (updatedTodo) {
        return NextResponse.json(updatedTodo);
    } else {
        return NextResponse.json(new Error("Not found"), { status: 404 });
    }
}


export async function DELETE(req: Request, { params }: { params: { id: number } }) {
    const id = params.id;
    await todoService.deleteTodo(Number(id));

    return NextResponse.json("success deleted", { status: 200 });
}
