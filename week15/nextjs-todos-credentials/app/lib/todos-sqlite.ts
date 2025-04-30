import BetterSqlite3 from "better-sqlite3";
import path from "path";
import { Todo } from "./types";

// Path to the todos Sqlite file
const todosFilePath = path.join(process.cwd(), "app", "data", "todos.sqlite");

// Initialize the database and create the table if it doesn't exist
const db = BetterSqlite3(todosFilePath, { verbose: console.log });
db.pragma("journal_mode = WAL");

const createStatement = db.prepare(
  `CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, completed INTEGER, createdAt TEXT)`
);
createStatement.run();

// Get todos (filtered by completion status)
export async function getTodos(completed: boolean = false): Promise<Todo[]> {
  const stmt = db.prepare("SELECT * FROM todos WHERE completed = ?");
  const rows = stmt.all(completed ? 1 : 0) as {
    id: number;
    title: string;
    completed: number;
    createdAt: string;
  }[];
  const todos: Todo[] = [];
  if (!rows) return todos;
  rows.forEach((row) => {
    const aTodo = {
      id: row.id.toString(),
      title: row.title,
      completed: Boolean(row.completed),
      createdAt: row.createdAt,
    };
    todos.push(aTodo);
  });
  return todos;
}

// Get all todos
export async function getAllTodos(): Promise<Todo[]> {
  const stmt = db.prepare("SELECT * FROM todos");
  const rows = stmt.all() as {
    id: number;
    title: string;
    completed: number;
    createdAt: string;
  }[];
  const todos: Todo[] = [];
  rows.forEach((row) => {
    const aTodo = {
      id: row.id.toString(),
      title: row.title,
      completed: Boolean(row.completed),
      createdAt: row.createdAt,
    };
    todos.push(aTodo);
  });
  return todos;
}

// Get a todo by ID
export async function getTodoById(id: string): Promise<Todo | null> {
  const stmt = db.prepare("SELECT * FROM todos WHERE id = ?");
  const row = stmt.get(Number(id)) as {
    id: number;
    title: string;
    completed: number;
    createdAt: string;
  };
  if (!row) return null;
  const todo: Todo = {
    id: row.id.toString(),
    title: row.title,
    completed: Boolean(row.completed),
    createdAt: row.createdAt,
  };
  return todo;
}

// Create a new todo
export async function createTodo(title: string): Promise<Todo> {
  console.log("createTodo", title);
  const newTodo: Omit<Todo, "id"> = {
    title,
    completed: false,
    createdAt: new Date().toISOString(),
  };
  console.log("newTodo", newTodo);
  const stmt = db.prepare(
    "INSERT INTO todos (title, completed, createdAt ) VALUES (?, ?, ?)"
  );

  const result = stmt.run(
    newTodo.title,
    newTodo.completed ? 1 : 0,
    newTodo.createdAt
  );

  console.log("result", result);

  const todo: Todo = {
    id: result.lastInsertRowid.toString(),
    title: newTodo.title,
    completed: newTodo.completed,
    createdAt: newTodo.createdAt,
  };
  return todo;
}

// Update an existing todo
export async function updateTodo(
  id: string,
  title: string
): Promise<Todo | null> {
  const stmt = db.prepare("UPDATE todos SET title = ? WHERE id = ?");
  const info = stmt.run(title, Number(id));
  if (info.changes === 0) {
    return null; // No rows were updated
  }
  const updatedTodo = await getTodoById(info.lastInsertRowid.toString());
  if (!updatedTodo) {
    return null; // Todo not found
  }
  return updatedTodo;
}

// Toggle todo completion
export async function toggleTodoCompletion(id: string): Promise<Todo | null> {
  const todo = await getTodoById(id);
  if (!todo) return null;
  const stmt = db.prepare("UPDATE todos SET completed = ? WHERE id = ?");
  const info = stmt.run(todo.completed ? 0 : 1, Number(id));
  if (info.changes === 0) {
    return null; // No rows were updated
  }
  const updatedTodo = await getTodoById(id);
  if (!updatedTodo) {
    return null; // Todo not found
  }
  return updatedTodo;
}

// Delete a todo
export async function deleteTodo(id: string): Promise<boolean> {
  const stmt = db.prepare("DELETE FROM todos WHERE id = ?");
  const info = stmt.run(Number(id));
  if (info.changes === 0) {
    return false; // No rows were deleted
  }

  return true;
}
