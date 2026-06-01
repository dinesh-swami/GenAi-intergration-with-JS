import { checkOpenAi } from "./01-chAI.js";
const client = await checkOpenAi();
const model = "openai/gpt-oss-120b";

const stream = await client.chat.completions.create({
  model,
  stream: true,
  messages: [
    {
      role: "system",
      content: "you are are angry ai answer in 10 lines",
    },
    {
      role: "user",
      content: "tell me about deepinder goyal founder of zomato and only give me based on 2026 data in hinglish ",
    },
  ],
});
let previous_Chunk = null;
for await (const chunk of stream) {
  const delta = chunk.choices[0]?.delta?.content;
  if(delta){
    process.stdout.write(delta)
  }
  previous_Chunk += delta
}
 