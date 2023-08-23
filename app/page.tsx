"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ddd;
`;

const Button = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const TodoList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const TodoItem = styled.li`
  padding: 10px;
  border: 1px solid #ddd;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer
`;

const EditContainer = styled.div`
  margin-top: 20px;
`;

interface TodoProps {
  id: number;
  title: string;
}

const Home: React.FC = () => {
  const [todos, setTodos] = useState<TodoProps[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [selectedTodo, setSelectedTodo] = useState<TodoProps | null>(null);
  const [editTitle, setEditTitle] = useState<string>("");

  const fetchTodos = async () => {
    try {
      const response = await axios.get("/todo");
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const handleAddTodo = async () => {
    if (newTodo) {
      try {
        const response = await axios.post("/todo", {
          title: newTodo,
        });
        const addedTodo = response.data;
        setTodos([...todos, addedTodo]);
        setNewTodo("");
      } catch (error) {
        console.error("Error adding todo:", error);
      }
    }
  };

  const handleShow = async (id: number) => {
    try {
      const response = await axios.get(`/todo/${id}`);
      setSelectedTodo(response.data);
      setEditTitle(response.data?.title);
    } catch (err) {
      console.error("Error fetching todo:", err);
    }
  };

  const handleUpdate = async () => {
    if (selectedTodo && editTitle) {
      try {
        const response = await axios.put(`/todo/${selectedTodo.id}`, {
          title: editTitle,
        });
        const updatedTodo = response.data;
        setTodos(
          todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
        );
        setSelectedTodo(null);
        setEditTitle("");
      } catch (error) {
        console.error("Error updating todo:", error);
      }
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/todo/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
      setSelectedTodo(null);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <Container>
      <Title>TODO アプリ</Title>

      <div>
        <Input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="新しいタスク"
        />

        <Button onClick={handleAddTodo}>追加</Button>
      </div>

      <TodoList>
        {todos.map((todo, idx) => (
          <TodoItem key={idx} onClick={() => handleShow(todo.id)}>
            <span>{todo.title}</span>
            <Button onClick={() => handleDelete(todo.id)}>削除</Button>
          </TodoItem>
        ))}
      </TodoList>

      {selectedTodo && (
        <EditContainer>
          <h2>タスクの編集</h2>
          <Input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="タスクのタイトルを編集"
          />
          <Button onClick={handleUpdate}>更新</Button>
        </EditContainer>
      )}
    </Container>
  );
};

export default Home;
