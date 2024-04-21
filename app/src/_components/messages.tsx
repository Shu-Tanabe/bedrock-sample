import { Message } from "ai/react";

export function Message({ role, content }: Message) {
  return (
    <div>
      {role === "user" ? "User: " : "AI: "}
      {content}
    </div>
  );
}
