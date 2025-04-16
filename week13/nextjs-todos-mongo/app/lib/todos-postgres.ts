import postgres from "postgres";
import { Todo } from "./types";

const sql = postgres(process.env.DATABASE_URL!, { ssl: "verify-full" });

// Get todos (filtered by completion status)
export async function getTodos(completed: boolean = false): Promise<Todo[]> {
  const todos: Todo[] = [];
  try {
    const rows = await sql`SELECT * FROM todos WHERE completed = ${completed}`;
    rows.forEach((todo) => {
      const aTodo = {
        id: todo.id.toString(),
        title: todo.title,
        completed: Boolean(todo.completed),
        createdAt: todo.createdAt,
      };
      todos.push(aTodo);
    });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch todos.");
  }
  return todos;
}

// Get all todos
export async function getAllTodos(): Promise<Todo[]> {
  const todos: Todo[] = [];
  try {
    const rows = await sql`SELECT * FROM todos`;
    rows.forEach((todo) => {
      const aTodo = {
        id: todo.id.toString(),
        title: todo.title,
        completed: Boolean(todo.completed),
        createdAt: todo.createdAt,
      };
      todos.push(aTodo);
    });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch todos.");
  }
  return todos;
}

// Get a todo by ID
export async function getTodoById(id: string): Promise<Todo | null> {
  try {
    const rows = await sql`SELECT * FROM todos WHERE id = ${id}`;
    if (rows.length === 0) return null;
    const row = rows[0];
    const todo: Todo = {
      id: row.id.toString(),
      title: row.title,
      completed: Boolean(row.completed),
      createdAt: row.createdAt,
    };
    return todo;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch todo by ID.");
  }
}

// Create a new todo
export async function createTodo(title: string): Promise<Todo> {
  const newTodo: Omit<Todo, "id"> = {
    title,
    completed: false,
    createdAt: new Date().toISOString(),
  };

  try {
    const rows = await sql`
      INSERT INTO todos (title, completed, createdAt)
      VALUES (${newTodo.title}, ${newTodo.completed}, ${newTodo.createdAt})
      RETURNING id, title, completed, createdAt
    `;

    const todo: Todo = {
      id: rows[0].id.toString(),
      title: rows[0].title,
      completed: Boolean(rows[0].completed),
      createdAt: rows[0].createdAt,
    };

    return todo;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to create todo.");
  }
}

// Update an existing todo
export async function updateTodo(
  id: string,
  title: string
): Promise<Todo | null> {
  try {
    const rows = await sql`
      UPDATE todos
      SET title = ${title}
      WHERE id = ${id}
      RETURNING id, title, completed, createdAt
    `;

    if (rows.length === 0) {
      return null; // No rows were updated
    }

    const updatedTodo: Todo = {
      id: rows[0].id.toString(),
      title: rows[0].title,
      completed: Boolean(rows[0].completed),
      createdAt: rows[0].createdAt,
    };

    return updatedTodo;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to update todo.");
  }
}

// Toggle todo completion
export async function toggleTodoCompletion(id: string): Promise<Todo | null> {
  const todo = await getTodoById(id);
  if (!todo) return null;

  try {
    const rows = await sql`
      UPDATE todos
      SET completed = ${!todo.completed}
      WHERE id = ${id}
      RETURNING id, title, completed, createdAt
    `;

    if (rows.length === 0) {
      return null; // No rows were updated
    }

    const updatedTodo: Todo = {
      id: rows[0].id.toString(),
      title: rows[0].title,
      completed: Boolean(rows[0].completed),
      createdAt: rows[0].createdAt,
    };

    return updatedTodo;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to toggle todo completion.");
  }
}

// Delete a todo
export async function deleteTodo(id: string): Promise<boolean> {
  try {
    const result = await sql`DELETE FROM todos WHERE id = ${id}`;
    return result.count > 0; // Returns true if rows were deleted
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to delete todo.");
  }
}
