import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req) {
  try {
    const { messages, system } = await req.json();

    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system,
      messages,
    });

    return Response.json({ content: response.content });
  } catch (err) {
    console.error("Anthropic error:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
