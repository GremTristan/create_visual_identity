import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    const { messages, system } = await req.json();

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: system,
    });

    // Gemini uses "model" instead of "assistant"
    const history = messages.slice(0, -1).map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const lastMessage = messages[messages.length - 1];

    const chat = model.startChat({ history });
    const result = await chat.sendMessage(lastMessage.content);
    const text = result.response.text();

    // Keep same response envelope so the frontend doesn't change
    return Response.json({ content: [{ type: "text", text }] });
  } catch (err) {
    console.error("Gemini error:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
