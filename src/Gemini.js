
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: "YOUR_GROQ_API_KEY",
  dangerouslyAllowBrowser: true,
});

async function run(prompt) {
  const result = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are Pradeep's AI assistant. Reply briefly in Hindi, Hinglish, or English according to the user.",
      },
      { role: "user", content: prompt },
    ],
    model: "openai/gpt-oss-120b",
  });

  return result.choices[0]?.message?.content || "No response received.";
}

export default run;
