// har jagah env varible + open ai ka clint dono yaah honge.
import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.OPEN_AI_API_KEY;

export const keyCheker = () => {
  if (!API_KEY) {
    console.error("Error: api key is not set in enviroment variable");
    process.exit(1);
  }
};

export const checkOpenAi = async () => {
  const openai = (await import("openai")).default;
  const client = new openai.OpenAI({
    apiKey: API_KEY,
     baseURL: "https://api.groq.com/openai/v1",
  });
  if (!client) {
    console.error("Error: failed to initialize openAi client");
    process.exit(1);
  }
  console.log('openAi client inititalized Successfully.')
  return client;
};
