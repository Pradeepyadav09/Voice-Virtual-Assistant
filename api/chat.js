
import Groq from "groq-sdk";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const { prompt } = req.body;

    const result = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are Pradeep's AI assistant. Reply briefly in Hindi, Hinglish, or English.",
        },
        { role: "user", content: prompt },
      ],
      model: "openai/gpt-oss-120b",
    });

    return res.status(200).json({
      answer: result.choices[0]?.message?.content || "No response received.",
    });
  } catch (error) {
    console.error("Groq API error:", error.message);
    return res.status(500).json({
      error: "AI service mein error aa gaya hai.",
    });
  }
}
