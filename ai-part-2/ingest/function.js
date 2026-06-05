import { inngest } from "./client.js";
import { auditLog } from "../store.js";
import { step } from "inngest";

export const onTodoCreated = inngest.createFunction(
  {
    id: "on-todo-created",
    triggers: [{ event: "todo/created" }],
  },
  async ({ event, step }) => {
    await step.run("audit", async () => {
      auditLog.push({
        action: "created",
        todoId: event.data.todo.id,
        title: event.data.todo.title,
        timestamps: new Date().toISOString(),
      });
      return { ok: true };
    });
    return { ok: true };
  },
);

export const onDeleteTodo = inngest.createFunction(
  {
    id: "on-todo-delete",
    retries: 2,
    triggers: [{ event: "todo/deleted" }],
  },
  async ({ event, step, Attempt }) => {
    const id = event.data.todo.id;
    await step.run("cleanup", async () => {
      if (Attempt === 0) {
        throw new Error(`fialed to delete todo ${id}`);
      }
      return "todo deleted Successfully";
    });
    await step.run("audit", async () => {
      auditLog.push({
        action: "deleted",
        todoId: id,
      });
      return { ok: true };
    });
  },
);
