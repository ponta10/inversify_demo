"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';

interface TodoProps {
    id: number;
    title: string;
    completed: boolean;
}

const Home: React.FC = () => {
    const [todos, setTodos] = useState<TodoProps[]>([]);
    const [newTodo, setNewTodo] = useState<string>('');
    const [selectedTodo, setSelectedTodo] = useState<TodoProps | null>(null);
    const [editTitle, setEditTitle] = useState<string>('');

    const fetchTodos = async () => {
        try {
            const response = await axios.get('/todo');
            setTodos(response.data);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    const handleAddTodo = async () => {
        if (newTodo) {
            try {
                const response = await axios.post('/todo', {
                    title: newTodo
                });
                const addedTodo = response.data;
                setTodos([...todos, addedTodo]);
                setNewTodo('');
            } catch (error) {
                console.error('Error adding todo:', error);
            }
        }
    };

    const handleShow = async (id: number) => {
        try {
            const response = await axios.get(`/todo/${id}`);
            setSelectedTodo(response.data);
        } catch (err) {
            console.error('Error fetching todo:', err);
        }
    };

    const handleUpdate = async () => {
        if (selectedTodo && editTitle) {
            try {
                const response = await axios.put(`/todo/${selectedTodo.id}`, {
                    title: editTitle
                });
                const updatedTodo = response.data;
                setTodos(todos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo));
                setSelectedTodo(null);
                setEditTitle('');
            } catch (error) {
                console.error('Error updating todo:', error);
            }
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`/todo/${id}`);
            setTodos(todos.filter(todo => todo.id !== id));
            setSelectedTodo(null);
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <div>
            <h1>TODO アプリ</h1>
            
            <input 
                value={newTodo} 
                onChange={e => setNewTodo(e.target.value)} 
                placeholder="新しいタスク"
            />
            
            <button onClick={handleAddTodo}>追加</button>

            <ul>
                {todos.map((todo, idx) => (
                    <li key={idx} onClick={() => handleShow(todo.id)}>
                        {todo.title}
                        <button onClick={() => handleDelete(todo.id)}>削除</button>
                    </li>
                ))}
            </ul>

            {selectedTodo && (
                <div>
                    <h2>タスクの編集</h2>
                    <input 
                        value={editTitle} 
                        onChange={e => setEditTitle(e.target.value)} 
                        placeholder="タスクのタイトルを編集"
                    />
                    <button onClick={handleUpdate}>更新</button>
                </div>
            )}
        </div>
    );
}

export default Home;
