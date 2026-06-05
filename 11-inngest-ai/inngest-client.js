import { Inngest } from "inngest";
import { openaiResponses } from "@inngest/ai/models";
import "dotenv/config";
export const inngest = new Inngest({
  id: "chaicode-inngest-ai",
});

export const aiModel = openaiResponses({
  model: "openai/gpt-oss-120b",
  apiKey: process.env.OPEN_AI_API_KEY,
  baseUrl: "https://api.groq.com/openai/v1",
});
console.log(aiModel);
