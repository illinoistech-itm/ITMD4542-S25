"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  createTodo,
  deleteTodo,
  toggleTodoCompletion,
  updateTodo,
} from "./lib/todos-mongo";

// Validation schema
const TodoSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }).max(255),
});

// Create Todo Action
export async function addTodoAction(formData: FormData) {
  console.log("formData", formData);
  const validatedFields = TodoSchema.safeParse({
    title: formData.get("title"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to create todo",
    };
  }

  try {
    await createTodo(validatedFields.data.title);
    revalidatePath("/");
    revalidatePath("/new");
    return { message: "Todo created successfully" };
  } catch (error) {
    return {
      message: "Failed to create todo",
      errors: (error as Error).message,
    };
  }
}

// Update Todo Action
export async function updateTodoAction(id: string, formData: FormData) {
  console.log("formData", formData);
  const validatedFields = TodoSchema.safeParse({
    title: formData.get("title"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Failed to update todo",
    };
  }

  try {
    await updateTodo(id, validatedFields.data.title);
    revalidatePath("/");
    revalidatePath("/new");
    revalidatePath("/completed");
    return { message: "Todo updated successfully" };
  } catch (error) {
    return {
      message: "Failed to update todo",
      errors: (error as Error).message,
    };
  }
}

// Toggle Completion Action
export async function toggleTodoCompletionAction(id: string) {
  console.log("id", id);
  try {
    await toggleTodoCompletion(id);
    revalidatePath("/");
    revalidatePath("/new");
    revalidatePath("/completed");
    return { message: "Todo status updated" };
  } catch (error) {
    return {
      message: "Failed to toggle todo",
      errors: (error as Error).message,
    };
  }
}

// Delete Todo Action
export async function deleteTodoAction(id: string) {
  try {
    await deleteTodo(id);
    revalidatePath("/");
    revalidatePath("/new");
    revalidatePath("/completed");
    return { message: "Todo deleted successfully" };
  } catch (error) {
    return {
      message: "Failed to delete todo",
      errors: (error as Error).message,
    };
  }
}
