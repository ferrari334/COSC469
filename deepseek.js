import { DEEPINFRA_API_KEY } from "./config.js";

const API_URL = "https://api.deepinfra.com/v1/openai/chat/completions";
const MODEL = "deepseek-ai/DeepSeek-V4.1-Flash";

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

// Sends the policy text to the LLM and returns its analysis as a string
export async function analyzePolicy(policyText) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${DEEPINFRA_API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: "system", content: systemInstructions },
        { role: "user", content: policyText },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`API request failed (${response.status}): ${await response.text()}`);
  }

  const data = await response.json();
  console.log("Tokens used:", data.usage.prompt_tokens, data.usage.completion_tokens);
  return data.choices[0].message.content;
}
