import { Todo } from "./types";
import mongoose from "mongoose";
import TodoModel from "./models/TodoModel";

mongoose
  .connect(process.env.MONGODB_URL!, { dbName: "nextjs-todos-mongoose" })
  .then(() => {
    console.log("Connected to MongoDB via mongoose");
  })
  .catch(() => {
    console.error("MongoDB connection error via mongoose");
  });

// Get todos (filtered by completion status)
export async function getTodos(completed: boolean = false): Promise<Todo[]> {
  const todos: Todo[] = [];
  try {
    const results = await TodoModel.find({ completed: completed }).exec();

    for await (const doc of results) {
      const aTodo = {
        id: doc._id.toString(),
        title: doc.title,
        completed: Boolean(doc.completed),
        createdAt: doc.createdAt,
      };
      todos.push(aTodo);
    }
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
    const data = await TodoModel.find();
    for (const doc of data) {
      const aTodo = {
        id: doc._id.toString(),
        title: doc.title,
        completed: Boolean(doc.completed),
        createdAt: doc.createdAt,
      };
      todos.push(aTodo);
    }
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch todos.");
  }
  return todos;
}

// Get a todo by ID
export async function getTodoById(id: string): Promise<Todo | null> {
  try {
    const doc = await TodoModel.findById(id).exec();

    if (!doc) return null;
    const todo: Todo = {
      id: doc._id.toString(),
      title: doc.title,
      completed: Boolean(doc.completed),
      createdAt: doc.createdAt,
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
    const newTodoModel = new TodoModel(newTodo);
    await newTodoModel.save();
    console.log("Inserted ID:", newTodoModel._id);

    const todo: Todo = {
      id: newTodoModel._id.toString(),
      title: newTodoModel.title,
      completed: Boolean(newTodoModel.completed),
      createdAt: newTodoModel.createdAt,
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
    const updatedDoc = await TodoModel.findByIdAndUpdate(id, {
      title: title,
    }).exec();

    if (!updatedDoc) return null;
    console.log("Updated ID:", updatedDoc._id);

    const updatedTodo: Todo = {
      id: updatedDoc._id.toString(),
      title: updatedDoc.title,
      completed: Boolean(updatedDoc.completed),
      createdAt: updatedDoc.createdAt,
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
    const updatedDoc = await TodoModel.findByIdAndUpdate(id, {
      completed: !todo.completed,
    }).exec();

    if (!updatedDoc) return null;
    console.log("Updated ID:", updatedDoc._id);

    const updatedTodo: Todo = {
      id: updatedDoc._id.toString(),
      title: updatedDoc.title,
      completed: Boolean(updatedDoc.completed),
      createdAt: updatedDoc.createdAt,
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
    const deletedDoc = await TodoModel.findByIdAndDelete(id).exec();
    if (!deletedDoc) {
      return false; // No document was deleted
    }
    console.log("Deleted ID:", deletedDoc._id);
    return true; // Document was deleted successfully
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to delete todo.");
  }
}
