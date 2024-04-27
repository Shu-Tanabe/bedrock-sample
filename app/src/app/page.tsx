"use client";

import { Message } from "@/app/_components/message";
import { useChat } from "ai/react";
import { OperationType } from "./_types/operation";
import { useState } from "react";

export default function Home() {
  const [type, setType] = useState<OperationType>("CHAT");
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    body: { type },
  });

  return (
    <main>
      <div>
        <label htmlFor="chat">Chat</label>
        <input
          type="radio"
          name="chat"
          value="CHAT"
          onChange={() => setType("CHAT")}
          checked={type === "CHAT"}
        />
        <label htmlFor="summary">Summary</label>
        <input
          type="radio"
          name="summary"
          value="SUMMARY"
          onChange={() => setType("SUMMARY")}
          checked={type === "SUMMARY"}
        />
      </div>

      {messages.map((message) => (
        <Message key={message.id} {...message} />
      ))}

      <form onSubmit={handleSubmit}>
        <div>
          <textarea
            value={input}
            onChange={handleInputChange}
            placeholder="議題の内容を入力してください"
          />
        </div>
        <button type="submit">Send</button>
      </form>
    </main>
  );
}
