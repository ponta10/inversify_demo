import { TodoService } from "@/application/TodoService";
import container from "@/inversify.config";
import TYPES from "@/types";
import { NextResponse } from "next/server";

const todoService = container.get<TodoService>(TYPES.TodoService);

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const id = params.id;
    const todo = await todoService.getTodo(Number(id));

    if (todo) {
        return NextResponse.json(todo);
    } else {
        return NextResponse.json(new Error("Not found"), { status: 404 });
    }
}

export async function PUT(request: Request, { params }: { params: { id: number } }) {

}


export async function DELETE(request: Request, { params }: { params: { id: number } }) {

}
