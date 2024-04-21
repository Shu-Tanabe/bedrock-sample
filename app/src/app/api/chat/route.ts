import {
  BedrockRuntimeClient,
  InvokeModelWithResponseStreamCommand,
} from "@aws-sdk/client-bedrock-runtime";
import { AWSBedrockAnthropicMessagesStream, StreamingTextResponse } from "ai";
import { Message } from "ai/react";

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

const bedrockClient = new BedrockRuntimeClient({
  region: process.env.AWS_REGION ?? "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "",
  },
});

export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { messages } = await req.json();

  const message = messages[messages.length - 1] as Message;

  const payload = {
    anthropic_version: "bedrock-2023-05-31",
    max_tokens: 1000,
    messages: [
      {
        role: "user",
        content: [{ type: "text", text: message.content }],
      },
    ],
  };

  // Ask Claude for a streaming chat completion given the prompt
  const bedrockResponse = await bedrockClient.send(
    new InvokeModelWithResponseStreamCommand({
      modelId: "anthropic.claude-3-haiku-20240307-v1:0",
      contentType: "application/json",
      accept: "application/json",
      body: JSON.stringify(payload),
    })
  );

  // Convert the response into a friendly text-stream
  const stream = AWSBedrockAnthropicMessagesStream(bedrockResponse);

  // Respond with the stream
  const resp = new StreamingTextResponse(stream);
  console.log("-------------------");
  console.log("Response", resp.body);
  return resp;
}
