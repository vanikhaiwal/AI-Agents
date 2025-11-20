import express from "express";
import cors from "cors";
import { runAgent } from "./agent.js"; // IMPORTANT! Keep .js because compiled output is JS

const app = express();

app.use(cors());
app.use(express.json());

app.post("/agent", async (req, res) => {
  const { query } = req.body;

  try {
    const output = await runAgent(query);
    res.json({ output });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
