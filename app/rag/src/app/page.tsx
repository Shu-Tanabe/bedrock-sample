"use client";

import { Message } from "@/app/_components/message";
import { useState } from "react";

const send = async (msg: string) => {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt: msg }),
  });

  return res.json();
};

export default function Home() {
  const [input, setInput] = useState("");
  const [completion, setCompletion] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await send(input);
    setCompletion(res.completion);
  };

  return (
    <main>
      <Message id="hhh" role="tool" content={completion} />

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
