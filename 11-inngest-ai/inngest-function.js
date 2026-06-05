import "dotenv/config";
import { inngest } from "./inngest-client.js";

export const onOrderPlaced = inngest.createFunction(
  {
    id: "customer-on-order-id",
    retries: 3,
    triggers: [{ event: "on-order-placed" }],
  },
  async ({ event, step }) => {
    const { orderId, customer } = event.data;

    // step define honge
    const greet = await step.run("greet", async () => {
      return `hello mr. ${customer} Thanks for Order ${orderId}`;
    });

    //step 2 for logs
    await step.run("greeting-logs", async () => {
      console.log(`Success ${greet}`);
    });
    // step 3 me database me logs save kar sakte hoo
  },
);
