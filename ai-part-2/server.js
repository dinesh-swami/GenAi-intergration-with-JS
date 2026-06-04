import express from "express";
import { createTodo, todos } from "./store.js";

const app = express();

app.use(express.json());

app.post("/todos", (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "title is required" });
  const todo = createTodo(title);
  res.status(201).json(todo);
});

app.listen(3000, () => console.log("server running..."));
