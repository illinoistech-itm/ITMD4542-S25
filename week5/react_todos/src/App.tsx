import { useState } from "react";
import "./App.css";
import AppHeader from "./components/AppHeader";
import { Todo } from "./types";
import TodoItem from "./components/TodoItem";
import TodoList from "./components/TodoList";

function App() {
  const mockData: Todo[] = [
    {
      userId: 1,
      id: 1,
      title: "delectus aut autem",
      completed: false,
    },
    {
      userId: 1,
      id: 2,
      title: "quis ut nam facilis et officia qui",
      completed: false,
    },
    {
      userId: 1,
      id: 3,
      title: "fugiat veniam minus",
      completed: false,
    },
    {
      userId: 1,
      id: 4,
      title: "et porro tempora",
      completed: true,
    },
    {
      userId: 1,
      id: 5,
      title: "laboriosam mollitia et enim quasi adipisci quia provident illum",
      completed: false,
    },
    {
      userId: 1,
      id: 6,
      title: "qui ullam ratione quibusdam voluptatem quia omnis",
      completed: false,
    },
  ];

  const [todos, setTodos] = useState<Todo[]>(mockData);

  const handleComplete = (id: number) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: true };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const handleDelete = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  return (
    <>
      <AppHeader />
      <div>
        <TodoList completed={false} headline="My Todos" todos={todos} />
        <TodoList
          completed={true}
          headline="My Completed Todos"
          todos={todos}
        />
      </div>
    </>
  );
}

export default App;
