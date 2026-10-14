import OpenAI from "openai";
import prompt from "./script.js"; // Import the prompt from script.js


const openai = new OpenAI({
    baseURL: 'https://api.deepinfra.com/v1/openai',
    apiKey: process.env.DEEPINFRA_API_KEY,
});

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt}],
    model: "deepseek-ai/DeepSeek-V4.1-Flash",
  });

  console.log(completion.choices[0].message.content);
  console.log(completion.usage.prompt_tokens, completion.usage.completion_tokens);
}

main();

