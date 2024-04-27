"use client";

import { Message } from "@/app/_components/message";
import { useChat } from "ai/react";

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <main>
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
        <button type="submit">要約</button>
      </form>
    </main>
  );
}
