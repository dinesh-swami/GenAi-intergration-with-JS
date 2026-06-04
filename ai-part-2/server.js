import express from "express";
import "dotenv/config";
import { createTodo, todos } from "./store.js";
import { serve } from "inngest/express";
import { inngest } from "./ingest/client.js";
import { onTodoCreated } from "./ingest/function.js";

const app = express();
app.use(express.json());
app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions: [onTodoCreated],
  }),
);

app.post("/todos", (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "title is required" });
  const todo = createTodo(title);
  res.status(201).json(todo);
});

app.listen(3000, () => console.log("server running..."));
