import { useEffect, useState } from 'react';

const Home: React.FC = () => {
    const [todos, setTodos] = useState<string[]>([]);
    const [newTodo, setNewTodo] = useState<string>('');

    const fetchTodos = async () => {
        const response = await fetch('/api/todos');
        const data = await response.json();
        setTodos(data);
    };

    const handleAddTodo = async () => {
        if (newTodo) {
            const response = await fetch('/api/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: newTodo })
            });
            const addedTodo = await response.json();
            setTodos([...todos, addedTodo.title]);
            setNewTodo('');
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
                {todos.map((todo, idx) => (
                    <li key={idx}>{todo}</li>
                ))}
            </ul>
        </div>
    );
}

export default Home;
