import "dotenv/config";
import { serve } from "inngest/express";
import { inngest } from "./inngest-client.js";
import { onOrderPlaced } from "./inngest-function.js";
import { summmerizeAndThen } from "./02-step-ai.js";
import express from "express";
const app = express();
app.use(express.json());

app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions: [onOrderPlaced, summmerizeAndThen],
  }),
);

app.get("/", (req, res) => {
  res.json({ message: "hello world" });
});

app.listen(3000, () => console.log("server running..."));
