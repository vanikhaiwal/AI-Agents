import { 
    OpenAI, 
    FunctionTool, 
    OpenAIAgent,
    Settings
} from "llamaindex"
import 'dotenv/config'

// Setup LLM once
Settings.llm = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    model: "gpt-4o-mini",
})

Settings.callbackManager.on("llm-tool-call", (event) => {
    console.log(event.detail.payload)
})
Settings.callbackManager.on("llm-tool-result", (event) => {
    console.log(event.detail.payload)
})

// ---- Define tools ----
const sumNumbers = (params: {a: number, b :number}) => {
    return `${params.a + params.b}`;
}

const tools = [
    FunctionTool.from(
        sumNumbers,
        {
            name: "sumNumbers",
            description: "Use this function to sum two numbers",
            parameters: {
                type: "object",
                properties: {
                    a: { type: "number" },
                    b: { type: "number" }
                },
                required: ["a", "b"]
            }
        }
    )
]

const agent = new OpenAIAgent({ tools })

// ---- IMPORTANT EXPORT ----
export async function runAgent(message: string) {
    const response = await agent.chat({
        message: message,
    })

    return response.response.message.content
}
