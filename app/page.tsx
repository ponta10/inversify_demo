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
        console.log(response?.data);
      } catch (err) {
        throw err;
      }
    };

    // 初期ロード時にTODOを取得
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
                {todos?.map((todo, idx) => (
                    <li key={idx} onClick={() => handleShow(todo?.id)}>{todo?.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default Home;
