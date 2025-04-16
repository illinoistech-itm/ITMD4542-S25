import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, required: true },
  createdAt: { type: String, required: true },
});

const TodoModel = mongoose.models.Todo || mongoose.model("Todo", todoSchema);

export default TodoModel;
