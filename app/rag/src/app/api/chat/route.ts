import {
  BedrockAgentRuntimeClient,
  InvokeAgentCommand,
} from "@aws-sdk/client-bedrock-agent-runtime";
import { NextResponse } from "next/server";

const invokeBedrockAgent = async (prompt: string, sessionId: string) => {
  const client = new BedrockAgentRuntimeClient({
    region: process.env.AWS_REGION ?? "us-east-1",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "",
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "",
    },
  });

  const agentId = "Xxx";
  const agentAliasId = "Xxx";

  const command = new InvokeAgentCommand({
    agentId,
    agentAliasId,
    sessionId,
    inputText: prompt,
  });

  try {
    let completion = "";
    const response = await client.send(command);

    if (response.completion) {
      const textDecoder = new TextDecoder("utf-8");
      for await (let chunkEvent of response.completion) {
        const chunk = textDecoder.decode(chunkEvent.chunk?.bytes);
        completion += chunk;
      }

      return { sessionId: sessionId, completion };
    }
  } catch (err) {
    throw new Error("Failed to invoke the agent");
  }
};

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { prompt } = await req.json();

  const reqMessage = prompt as string;

  // Ask Claude for a streaming chat completion given the prompt
  const res = await invokeBedrockAgent(reqMessage, "test-session-id");

  const resp = new NextResponse(JSON.stringify(res), {
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Respond with the stream
  return resp;
}
