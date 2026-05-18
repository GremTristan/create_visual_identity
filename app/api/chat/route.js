import Groq from "groq-sdk";

export async function POST(req) {
  try {
    const { messages, system } = await req.json();

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: system },
        ...messages.map((m) => ({ role: m.role, content: m.content })),
      ],
      max_tokens: 300,
    });

    const text = completion.choices[0]?.message?.content || "";
    return Response.json({ content: [{ type: "text", text }] });
  } catch (err) {
    console.error("Groq error:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
