import "dotenv/config";
import { inngest, aiModel } from "./inngest-client.js";
import { step } from "inngest";

export const summmerizeAndThen = inngest.createFunction(
  {
    id: "ai-call-summerize",
    triggers: [{ event: "chai-summerize" }],
  },
  async ({ event, step }) => {
    const summery = await step.ai.infer("summerize", {
      model: aiModel,
      body: {
        input: [
          {
            role: "user",
            content: "Summerize the follwing text in 1 line " + event.data.text,
          },
        ],
      },
    });

    const SumResponse = summery.output[0].content[0].text;

    const translated = await step.ai.infer("translate", {
      model: aiModel,
      body: {
        input: {
          role: "user",
          content: "transltate the following data to Hinglish" + SumResponse,
        },
      },
    });
    const translation = translated.output[0].content[0].text;
    console.log(translation)
    return translation;
  },
);
