import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const { message } = req.body;

    const response = await client.responses.create({
      model: "gpt-4o-mini",
      input: message
    });

    const text =
      response.output_text ||
      response.output?.[0]?.content?.[0]?.text ||
      "No response";

    res.status(200).json({ reply: text });

  } catch (error) {
    res.status(500).json({ reply: error.message });
  }
}
