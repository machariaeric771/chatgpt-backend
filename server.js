app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await client.responses.create({
      model: "gpt-5",
      input: message
    });

    // SAFE extraction (this is the fix)
    let text = "";

    if (typeof response.output_text === "string") {
      text = response.output_text;
    } else if (response.output && response.output[0]) {
      text = response.output[0].content?.[0]?.text || "";
    }

    res.json({
      reply: text || "No response from AI"
    });

  } catch (error) {
    res.json({
      reply: "Error: " + error.message
    });
  }
});
