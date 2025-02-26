import { createContext, useReducer } from "react";
import "./App.css";
import AppHeader from "./components/AppHeader";
import { Todo, TodoActions } from "./types";
import TodoList from "./components/TodoList";
import NewTodo from "./components/NewTodo";
import { useLocalStorage } from "react-use";

export const ActionContext = createContext<TodoActions | null>(null);

type TodoAction = {
  type: "ADD_TODO" | "DETETE_TODO" | "COMPLETE_TODO";
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
