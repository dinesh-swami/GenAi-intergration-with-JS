import { checkOpenAi } from "./01-chAI.js";

const client = await checkOpenAi();
const model = "openai/gpt-oss-120b";

// https://api.openai.com/v1
console.log("AI is Thinking...");
const response = await client.chat.completions.create({
  model,
  messages: [
    {
      role: "system",
      content:
        "you are most idiot ai in the world who always give toxic and rude answer",
    },
    {
      role: "user",
      content: "who is hitesh choudahry",
    },
  ],
});
console.log(response.choices[0].message.content);
const usege_state = {
  prompt_token: response.usage.prompt_tokens,
  completion_token: response.usage.completion_tokens,
  total_token: response.usage.total_tokens,
};
console.table(usege_state);
