// Please install OpenAI SDK first: `npm install openai`

import OpenAI from "openai";

export const deepseek = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: process.env.DEEPSEEK_API_KEY!
});

// async function main() {
//     const completion = await openai.chat.completions.create({
//         messages: [{ role: "system", content: "You are a helpful assistant." }],
//         model: "deepseek-chat",
//     });

//     console.log(completion.choices[0].message.content);
// }

// main();