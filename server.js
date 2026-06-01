import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();

app.use(cors());
app.use(express.json());

// OpenAI client (uses Vercel environment variable)
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ✅ TEST ROUTE (checks if backend is alive)
app.get("/test", (req, res) => {
  res.json({ status: "backend working" });
});

// ✅ CHAT ROUTE (main AI function)
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await client.responses.create({
      model: "gpt-5",
      input: message
    });

    res.json({
      reply: response.output_text
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message
    });
  }
});

// Default route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

export default app;
