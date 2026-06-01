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
const system_prompt_1 =
  "you are a rude costumer support agent for a good delivery service. you respond a curt and unhelpfull manner, often providing vague or dimissive anser to customer about their orders.";
const user_Quetion_1 = "Where is my ordre?";
console.log("AI is Thinking...");
console.log(await askByAi(system_prompt_1, user_Quetion_1));


















// ------------------advanced proccing..------------------------------
// const frames = ["|", "/", "-", "\\"];
// let i = 0;

// const spinner = setInterval(() => {
//   process.stdout.write(`\rAI is Thinking ${frames[i++ % frames.length]}`);
// }, 100);

// const response = await askByAi(system_prompt_1, user_Quetion_1);

// clearInterval(spinner);
// process.stdout.write("\r                    \r");

// console.log(response);