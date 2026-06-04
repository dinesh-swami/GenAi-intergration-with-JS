export async function calculator({ op, a, b }) {
  if (typeof a !== "number" && typeof b !== "number") {
    return "Please provide valid numbers for a and b.";
  }
  switch (op) {
    case "add":
      return a + b;
    case "subtract":
      return a - b;
    case "multiply":
      return a * b;
    case "divide":
      if (b === 0) {
        return "Error: Division by zero is not allowed.";
      }
      return a / b;
    default:
      return "Error: Invalid operation. Please use add, subtract, multiply, or divide.";
  }
}
// meta data hai ye jo aap niche dekh rahe ho ohoo.... 
export const calculateTool = {
  type: "function",
  function: {
    name: "calculator",
    description:
      "A simple calculator funciton thats perfome basic arithemtic operaiton",
    parameters: {
      type: "object",
      properties: {
        op: { type: "string", enum: ["add", "subtract", "multiply", "divide"] },
        a: { type: "number" },
        b: { type: "number" },
      },
      required: ["op", "a", "b"],
    },
  },
};
