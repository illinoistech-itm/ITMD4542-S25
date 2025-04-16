import path from "path";
import fs from "fs/promises";
import { Todo } from "./types";
import { randomUUID } from "crypto";

// Path to the todos JSON file
const todosFilePath = path.join(process.cwd(), "app", "data", "todos.json");

// Read todos from JSON file
export async function readTodos(): Promise<Todo[]> {
  try {
    const data = await fs.readFile(todosFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist, return empty array
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

// Write todos to JSON file
export async function writeTodos(todos: Todo[]): Promise<void> {
  await fs.writeFile(todosFilePath, JSON.stringify(todos, null, 2));
}

// Get todos (filtered by completion status)
export async function getTodos(completed: boolean = false): Promise<Todo[]> {
  const todos = await readTodos();
  return todos.filter((todo) => todo.completed === completed);
}

// Get all todos
export async function getAllTodos(): Promise<Todo[]> {
  const todos = await readTodos();
  return todos;
}

// Get a single todo by ID
export async function getTodoById(id: string): Promise<Todo | null> {
  const todos = await readTodos();
  return todos.find((todo) => todo.id === id) || null;
}

// Create a new todo
export async function createTodo(title: string): Promise<Todo> {
  const todos = await readTodos();
  const newTodo: Todo = {
    id: randomUUID(),
    title,
    completed: false,
    createdAt: new Date().toISOString(),
  };
  todos.push(newTodo);
  await writeTodos(todos);

  return newTodo;
}

// Update an existing todo
export async function updateTodo(
  id: string,
  title: string
): Promise<Todo | null> {
  const todos = await readTodos();
  const todoIndex = todos.findIndex((todo) => todo.id === id);

  if (todoIndex === -1) return null;

  todos[todoIndex].title = title;
  await writeTodos(todos);

  return todos[todoIndex];
}

// Toggle todo completion
export async function toggleTodoCompletion(id: string): Promise<Todo | null> {
  const todos = await readTodos();
  const todoIndex = todos.findIndex((todo) => todo.id === id);

  if (todoIndex === -1) return null;

  todos[todoIndex].completed = !todos[todoIndex].completed;
  await writeTodos(todos);

  return todos[todoIndex];
}

// Delete a todo
export async function deleteTodo(id: string): Promise<boolean> {
  const todos = await readTodos();
  const initialLength = todos.length;
  const filteredTodos = todos.filter((todo) => todo.id !== id);

  if (initialLength === filteredTodos.length) return false;

  await writeTodos(filteredTodos);

  return true;
}
