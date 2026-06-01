import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();

app.use(cors());
app.use(express.json());

// Connect OpenAI using secret key from Vercel
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Main chat endpoint
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

// Test route (just to check if server works)
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

export default app;
