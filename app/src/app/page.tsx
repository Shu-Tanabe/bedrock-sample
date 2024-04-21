"use client";

import { Message } from "@/_components/messages";
import { useChat } from "ai/react";

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, error } = useChat();

  return (
    <main>
      {messages.map((message) => (
        <Message key={message.id} {...message} />
      ))}

      <form onSubmit={handleSubmit}>
        <label>
          Say something...
          <input value={input} onChange={handleInputChange} />
        </label>
        <button type="submit">Send</button>
      </form>
    </main>
  );
}
