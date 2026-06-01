// async function* foo(params) {
//     yield 2;
//     yield 1;
// }
// (async () => {
//     for await (const num of foo()) {
//         console.log(num);
//         break;
//     }
// })();
// (async () => {
//     for await (const num of foo()) {
//         console.log(num);
//         break;
//     }
// })();

import readline from "readline/promises";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const name = await rl.question("What is your name? ");

console.log(`Hello ${name}`);

