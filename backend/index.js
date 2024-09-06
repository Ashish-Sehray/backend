import express from "express";
import mongoose from "mongoose";
import Task from "./db/db.js";

import cors from "cors";
import bodyParser from "body-parser";

const app = express();

app.use(cors());
app.use(bodyParser.json());

try {
  mongoose
    .connect(
      "mongodb+srv://oyeankit6:Ankit2001@cluster0.84et6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => console.log("connected to db"));
} catch (error) {
  console.log(error);
}

app.post("/createtask", async (req, res) => {
  const data = req.body;
  console.log(data);
  const task = new Task(data);

  await task.save();
  res.send("Data Saved");
});

app.get("/taskedit/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  let Data = await Task.findById(id);
  res.json(Data);
});

app.get("/alltasks", async (req, res) => {
  let data = await Task.find();
  res.json(data);
});

app.put("/updatedata/:id", async (req, res) => {
  let data = req.body;

  let { id } = req.params;
  const Updatedtask = await Task.findByIdAndUpdate(id, data);
  console.log(Updatedtask);

  res.json(Updatedtask);
});

app.delete("/taskdelete/:id", async (req, res) => {
  let { id } = req.params;
  console.log(id);
  const taskDeleted = await Task.findByIdAndDelete({ _id: id });

  res.send("Deleted Successfully");
});

app.get("/", (req, res) => {
  res.send("server is working");
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
