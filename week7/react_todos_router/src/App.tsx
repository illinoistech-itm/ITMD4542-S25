import { createContext, useEffect, useState } from "react";
import "./App.css";
import AppHeader from "./components/AppHeader";
import { Todo, TodoActions } from "./types";
import TodoList from "./components/TodoList";
import NewTodo from "./components/NewTodo";
import { useLocalStorage } from "react-use";
import { NavLink, Route, Routes } from "react-router";

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
          </Routes>
        </div>
      </ActionContext.Provider>
    </>
  );
}

export default App;
