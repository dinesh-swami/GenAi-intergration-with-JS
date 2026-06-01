import { checkOpenAi } from "./01-chAI.js";
import readline, { createInterface } from "readline";
const client = await checkOpenAi();
const model = "openai/gpt-oss-120b";
const ai_persona = "You are helpfull ai who alwyas give response in 10 lines.";
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
// todo: pass history dalni hai.
function askQuetion(userInput) {
  return new Promise((resolve) => {
    rl.question(userInput, (answer) => {
      resolve(answer);
    });
  });
}

while (true) {
  const userQuetion = await askQuetion("Ask Anything: ");
  if (userQuetion.toLowerCase() === "exit") {
    console.log("closing...");
    break;
  }
  const stream = await client.chat.completions.create({
    model,
    stream: true,
    messages: [
      { role: "system", content: ai_persona },

      {
        role: "user",
        content: userQuetion,
      },
    ],
  });
  process.stdout.write("Chai Bot: ");
  for await (const chunk of stream) {
    const delta = chunk.choices[0]?.delta?.content;

    if (delta) {
      process.stdout.write(delta);
    }
  }
  console.log("\n");
}
rl.close();
//