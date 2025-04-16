import { Todo } from "./types";
import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URL!);

async function run() {
  await client.connect();
  return "Connected to MongoDB";
}

run().then(console.log).catch(console.error);

// Get todos (filtered by completion status)
export async function getTodos(completed: boolean = false): Promise<Todo[]> {
  const todos: Todo[] = [];
  try {
    const todosCollection = client.db("nextjs-todos-mongo").collection("todos");
    const filter = completed ? { completed: true } : { completed: false };
    const cursor = todosCollection.find(filter);
    for await (const doc of cursor) {
      const aTodo: Todo = {
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
    const todosCollection = client.db("nextjs-todos-mongo").collection("todos");
    const cursor = todosCollection.find({});
    for await (const doc of cursor) {
      const aTodo: Todo = {
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
    const todosCollection = client.db("nextjs-todos-mongo").collection("todos");
    const filter = { _id: new ObjectId(id) };
    const doc = await todosCollection.findOne(filter);
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
    const todosCollection = client.db("nextjs-todos-mongo").collection("todos");
    const result = await todosCollection.insertOne(newTodo);
    console.log("Inserted todo with ID:", result.insertedId);

    const todo: Todo = {
      id: result.insertedId.toString(),
      title: newTodo.title,
      completed: Boolean(false),
      createdAt: newTodo.createdAt,
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
    const todosCollection = client.db("nextjs-todos-mongo").collection("todos");
    const filter = { _id: new ObjectId(id) };
    const updateDoc = {
      $set: { title: title },
    };
    const result = await todosCollection.updateOne(filter, updateDoc);
    if (result.modifiedCount === 0) {
      return null; // No todo was found to update
    }

    const updatedTodo = await getTodoById(id);
    if (!updatedTodo) return null;
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
    const todosCollection = client.db("nextjs-todos-mongo").collection("todos");
    const filter = { _id: new ObjectId(id) };
    const updateDoc = {
      $set: { completed: !todo.completed },
    };
    const result = await todosCollection.updateOne(filter, updateDoc);
    if (result.modifiedCount === 0) {
      return null; // No todo was found to update
    }
    const updatedTodo = await getTodoById(id);
    if (!updatedTodo) return null;
    return updatedTodo;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to toggle todo completion.");
  }
}

// Delete a todo
export async function deleteTodo(id: string): Promise<boolean> {
  try {
    const todosCollection = client.db("nextjs-todos-mongo").collection("todos");
    const filter = { _id: new ObjectId(id) };
    const result = await todosCollection.deleteOne(filter);
    if (result.deletedCount === 0) {
      return false; // No todo was deleted
    }
    console.log(`Deleted ${result.deletedCount} todo(s)`);
    return true; // Todo was deleted
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to delete todo.");
  }
}
