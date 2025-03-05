import { createContext, useEffect, useState } from "react";
import "./App.css";
import AppHeader from "./components/AppHeader";
import { Todo, TodoActions } from "./types";
import TodoList from "./components/TodoList";
import NewTodo from "./components/NewTodo";
import { useLocalStorage } from "react-use";
import { NavLink, Route, Routes } from "react-router";
import ViewTodo from "./components/ViewTodo";

export const ActionContext = createContext<TodoActions | null>(null);

function App() {
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

  const handleUpdate = (id: number, title: string) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, title };
      }
      return todo;
    });
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
    handleUpdate,
  };

  return (
    <>
      <ActionContext.Provider value={todoActions}>
        <AppHeader />
        <NewTodo onSaveTodo={handleSave} />
        <nav>
          <ul>
            <li>
              <NavLink to="/">Todos</NavLink>
            </li>
            <li>
              <NavLink to="/completed">Completed</NavLink>
            </li>
          </ul>
        </nav>
        <div className="todo-container">
          <Routes>
            <Route
              path="/"
              element={
                <TodoList
                  actions={todoActions}
                  completed={false}
                  headline="My Todos"
                  todos={todos}
                />
              }
            />
            <Route
              path="/completed"
              element={
                <TodoList
                  actions={todoActions}
                  completed={true}
                  headline="My Completed Todos"
                  todos={todos}
                />
              }
            />
            <Route
              path="/todos/:todoId"
              element={<ViewTodo actions={todoActions} todos={todos} />}
            />
            <Route path="*" element={<h2>Not Found</h2>} />
          </Routes>
        </div>
      </ActionContext.Provider>
    </>
  );
}

export default App;
