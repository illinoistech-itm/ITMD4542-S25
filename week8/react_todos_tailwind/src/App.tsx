import { useReducer } from "react";
import "./App.css";
import AppHeader from "./components/AppHeader";
import { Todo, TodoActions } from "./types";
import TodoList from "./components/TodoList";
import { BrowserRouter, Route, Routes } from "react-router";
import AppNav from "./components/AppNav";
import ViewTodo from "./components/ViewTodo";

type TodoAction = {
  type: "ADD_TODO" | "DETETE_TODO" | "COMPLETE_TODO" | "UPDATE_TODO";
  payload: {
    id?: number;
    title?: string;
  };
};

function App() {
  const todoReducer = (state: Todo[], action: TodoAction) => {
    switch (action.type) {
      case "ADD_TODO": {
        const newTodo: Todo = {
          userId: 1,
          id: Math.max(...state.map((o) => o.id)) + 1,
          title: action.payload.title || "",
          completed: false,
        };
        return [newTodo, ...state];
      }
      case "DETETE_TODO":
        return state.filter((todo) => todo.id !== action.payload.id);
      case "COMPLETE_TODO":
        return state.map((todo) => {
          if (todo.id === action.payload.id) {
            return { ...todo, completed: true };
          }
          return todo;
        });
      case "UPDATE_TODO":
        return state.map((todo) => {
          if (todo.id === action.payload.id) {
            return { ...todo, title: action.payload.title || "" };
          }
          return todo;
        });
      default:
        throw new Error("Unknown action type");
    }
  };

  const getInitialTodos = (): Todo[] => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  };

  const [todos, dispatch] = useReducer(todoReducer, [], getInitialTodos);

  const handleComplete = (id: number) => {
    dispatch({ type: "COMPLETE_TODO", payload: { id: id } });
  };

  const handleDelete = (id: number) => {
    dispatch({ type: "DETETE_TODO", payload: { id } });
  };

  const handleSave = (title: string) => {
    dispatch({ type: "ADD_TODO", payload: { title } });
  };

  const handleUpdate = (id: number, title: string) => {
    dispatch({ type: "UPDATE_TODO", payload: { id, title } });
  };

  const todoActions: TodoActions = {
    handleComplete,
    handleDelete,
    handleUpdate,
    handleSave,
  };

  return (
    <BrowserRouter>
      <AppHeader />
      <AppNav />
      <div className="todo-container max-w-lg mx-auto px-6 pt-10">
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
    </BrowserRouter>
  );
}

export default App;
