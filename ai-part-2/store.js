export const todos = [];
export const auditLog = [];

let nextId = 1;

export function createTodo(title) {
  const todo = { id: nextId++, title, compeleted: false };
  todos.push(todo);
  return todo;
}

export function getTodo(id) {
  return todos.find((todo) => todo.id === id);
}

export function updateTodo(id, patch) {
  const todo = getTodo(id);
  if (!todo) return null;
  if (patch.title !== undefined) todo.title = patch.title;
  if (patch.compeleted !== undefined) todo.compeleted = patch.compeleted;
  return todo;
}

export function deleteTodo(id) {
  const index = todos.findIndex((todo) => todo.id === id);
  if (index === -1) return false;
  return todos.splice(index, 1)[0];
}

