// now problem is how can give memory... 
import { checkOpenAi } from "./01-chAI.js";
const client = await checkOpenAi();
const model = "openai/gpt-oss-120b";

async function askByAi(systemPrompt, userQuetion) {
  const response = await client.chat.completions.create({
    model,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userQuetion },
    ],
  });
  return response.choices[0].message.content;
}
const system_prompt_1 = "you are an idiot ai who always give 1 line answer";
const user_Quetion_1 = "my name is dinesh call me sir.";
console.log("+++++++++++++++ response 1 +++++++++++++++");
console.log(await askByAi(system_prompt_1, user_Quetion_1), "\n");

const system_prompt_2 = "you are an idiot ai who always give 1 line answer";
const user_Quetion_2 = "What is my name?";
console.log("+++++++++++++++ response 2 +++++++++++++++");
console.log(await askByAi(system_prompt_2, user_Quetion_2), "\n");
