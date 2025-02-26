import { createContext, useEffect, useState } from "react";
import "./App.css";
import AppHeader from "./components/AppHeader";
import { Todo, TodoActions } from "./types";
import TodoList from "./components/TodoList";
import NewTodo from "./components/NewTodo";
import { useLocalStorage } from "react-use";

export const ActionContext = createContext<TodoActions | null>(null);

function App() {
  // const mockData: Todo[] = [
  //   {
  //     userId: 1,
  //     id: 1,
  //     title: "delectus aut autem",
  //     completed: false,
  //   },
  //   {
  //     userId: 1,
  //     id: 2,
  //     title: "quis ut nam facilis et officia qui",
  //     completed: false,
  //   },
  //   {
  //     userId: 1,
  //     id: 3,
  //     title: "fugiat veniam minus",
  //     completed: false,
  //   },
  //   {
  //     userId: 1,
  //     id: 4,
  //     title: "et porro tempora",
  //     completed: true,
  //   },
  //   {
  //     userId: 1,
  //     id: 5,
  //     title: "laboriosam mollitia et enim quasi adipisci quia provident illum",
  //     completed: false,
  //   },
  //   {
  //     userId: 1,
  //     id: 6,
  //     title: "qui ullam ratione quibusdam voluptatem quia omnis",
  //     completed: false,
  //   },
  // ];

  // const [todos, setTodos] = useState<Todo[]>([]);

  // useEffect(() => {
  //   console.log("fetching data");
  //   fetch("https://jsonplaceholder.typicode.com/todos")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setTodos(data);
  //     });
  //   console.log("done fetching data");
  // }, []);

  const [todos = [], setTodos] = useLocalStorage<Todo[]>("todos", []);

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

  const handleSave = (title: string) => {
    const newTodo: Todo = {
      userId: 1,
      id: Math.max(...todos.map((o) => o.id)) + 1,
      title,
      completed: false,
    };
    setTodos([newTodo, ...todos]);
  };

  const todoActions: TodoActions = {
    handleComplete,
    handleDelete,
  };

  return (
    <>
      <ActionContext.Provider value={todoActions}>
        <AppHeader />
        <NewTodo onSaveTodo={handleSave} />
        <div className="todo-container">
          <TodoList
            actions={todoActions}
            completed={false}
            headline="My Todos"
            todos={todos}
          />
          <TodoList
            actions={todoActions}
            completed={true}
            headline="My Completed Todos"
            todos={todos}
          />
        </div>
      </ActionContext.Provider>
    </>
  );
}

export default App;
