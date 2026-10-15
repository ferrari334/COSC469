import OpenAI from "openai";
import prompt from "./script.js"; // Import the prompt from script.js


const openai = new OpenAI({
    baseURL: 'https://api.deepinfra.com/v1/openai',
    apiKey: process.env.DEEPINFRA_API_KEY,
});

// Instructions that tell the model what role it plays and how to respond
const systemInstructions = `You are an assistant for web users that need to 
know what they are agreeing to in Terms of Service and Privacy Policies. 
You are to analyze the text the user provides and make sure the user is aware 
of any potential risks, obligations, or important points in the text. You will
point out any clauses that may be concerning, and provide a summary of the key points in plain language.

Your output will be a structured summary of the key points, potential risks, and obligations found in the provided text. The output should be formatted as follows:
1. Key Points:
   - [List of key points in bullet format]
2. Potential Risks:
   - [List of potential risks in bullet format]
3. Obligations:
   - [List of obligations in bullet format] `

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: systemInstructions },
      { role: "user", content: prompt },
    ],
    model: "deepseek-ai/DeepSeek-V4.1-Flash",
  });

  console.log(completion.choices[0].message.content);
  console.log(completion.usage.prompt_tokens, completion.usage.completion_tokens);
}

main();

