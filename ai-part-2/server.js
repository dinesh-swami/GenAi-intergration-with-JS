import express from "express";
import "dotenv/config";
import { createTodo, todos, deleteTodo } from "./store.js";
import { serve } from "inngest/express";
import { inngest } from "./ingest/client.js";
import { onTodoCreated, onDeleteTodo } from "./ingest/function.js";

const app = express();
app.use(express.json());
app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions: [onTodoCreated, onDeleteTodo],
  }),
);

app.post("/todos", async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "title is required" });
  const todo = createTodo(title);
  await inngest.send({
    name: "todo/created",
    data: { todo },
  });
  res.status(201).json(todo);
});

app.delete("/todos/delete", async (req, res) => {
  const id = req.body.id;
  if (!id) return res.json({ status: 401, message: "id must required" });

  const todo = await deleteTodo(id);
  if (!todo) return res.json({ status: 401, message: "todo not found" });

  await inngest.send({
    name: "todo/deleted",
    data: { todo },
  });

  return res.json("succesfull");
});
// update , and baki khud likhlo
app.listen(3000, () => console.log("server running..."));
