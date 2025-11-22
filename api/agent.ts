import type { VercelRequest, VercelResponse } from "@vercel/node";
import { runAgent } from "../1_agent/agent";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const { message } = req.body;

    const output = await runAgent(message);

    res.status(200).json({ response: output });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
