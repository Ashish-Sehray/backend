import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  taskTitle: String,

  status: String,
  assignedMembers: String,
  dueDate: Date,
  isAssigned: Boolean,
  estimatedTime: String,
  priority: String,
  createdOn: { type: Date, default: Date.now() },
});

const Task = mongoose.model("Task", TaskSchema);

export default Task;
