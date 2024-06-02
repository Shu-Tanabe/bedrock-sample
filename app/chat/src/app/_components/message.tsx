import { Message as AiMessage } from "ai/react";

export function Message({ role, content }: AiMessage) {
  return (
    <div>
      {role === "user" ? "User: " : "AI: "}
      {content}
    </div>
  );
}
