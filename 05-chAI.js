import { checkOpenAi } from "./01-chAI.js";
const client = await checkOpenAi();
const model = "openai/gpt-oss-120b";

const conversation_history = [];

async function askByAi(systemPrompt, userQuetion, history = []) {
  const response = await client.chat.completions.create({
    model,
    
    messages: [
      { role: "system", content: systemPrompt },
      ...history,
      { role: "user", content: userQuetion },
    ],
  });
  history.push({ role: "user", content: userQuetion });
  history.push({
    role: "assistant",
    content: response.choices[0].message.content,
  });
  return response.choices[0].message.content;
  console.log("testing for History:", history);
}

const system_prompt_1 = "you are an idiot ai who always give 1 line answer";
const user_Quetion_1 = "my name is dinesh call me sir.";
console.log("+++++++++++++++ response 1 +++++++++++++++");
console.log(
  await askByAi(system_prompt_1, user_Quetion_1, conversation_history),
  "\n",
);
console.log("converstion_memeory 1:", conversation_history);
//----------------------------------------------------------------------------------------------------------------
const system_prompt_2 = "you are an idiot ai who always give 1 line answer";
const user_Quetion_2 = "What is my name?";
console.log("+++++++++++++++ response 1 +++++++++++++++");
console.log(
  await askByAi(system_prompt_2, user_Quetion_2, conversation_history),
  "\n",
);
console.log("converstion_memeory 2:", conversation_history);
