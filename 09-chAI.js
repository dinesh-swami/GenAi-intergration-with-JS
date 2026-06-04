import { FireExtinguisher } from "lucide-react";
import { checkOpenAi } from "./01-chAI.js";
import { calculateTool, calculator } from "./tools/calculator.js";
const client = await checkOpenAi();
const model = "openai/gpt-oss-120b";
const tools = [calculateTool];

const messages = [
  {
    role: "user",
    content: "add 2 + 2",
  },
];

const response = await client.chat.completions.create({
  model,
  messages,
  tool_choice: "auto",
  tools,
});
const fisrtResponse = response.choices[0].message;
console.log("Response from AI:", fisrtResponse);
console.log("Response from tool calling:", fisrtResponse.tool_calls);

messages.push(fisrtResponse);

if (fisrtResponse.tool_calls) {
  const toolcall = fisrtResponse.tool_calls[0];
  const toolResponse = await calculator(toolcall.arguments);
  console.log("+++++++++ tool response ++++++++++++");
  console.log("Response from tool:", toolResponse);
  messages.push({
    role: "tool",
    name: toolcall.name,
    content: toolResponse,
  });
}

const secondResponse = await client.chat.completions.create({
  model,
  messages,
  tool_choice: "auto",
  tools,
});
console.log("+++++++++ second response from AI after tool response ++++++++++++");
console.log(
  "Response from AI after tool response:",
  secondResponse.choices[0].message,
);

