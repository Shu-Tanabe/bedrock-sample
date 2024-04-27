import { summarization } from "@/app/_prompts/summarization";
import {
  BedrockRuntimeClient,
  InvokeModelWithResponseStreamCommand,
} from "@aws-sdk/client-bedrock-runtime";
import { AWSBedrockAnthropicMessagesStream, StreamingTextResponse } from "ai";
import { experimental_buildAnthropicMessages } from "ai/prompts";
import { Message } from "ai/react";
import { enhanceMessage } from "@/app/_libs/enhanceMessage";

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
  const { messages, type } = await req.json();

  const reqMessages = messages as Message[];

  reqMessages[reqMessages.length - 1].content = enhanceMessage(
    reqMessages[reqMessages.length - 1],
    type
  );

  const payload = {
    anthropic_version: "bedrock-2023-05-31",
    max_tokens: 1000,
    messages: experimental_buildAnthropicMessages(reqMessages),
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
  return resp;
}
