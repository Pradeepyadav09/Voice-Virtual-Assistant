async function run(prompt) {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "AI request failed");
    }

    return data.answer;
  } catch (error) {
    console.error("AI Error:", error);
    return "Sorry, AI service mein error aa gaya hai.";
  }
}

export default run;