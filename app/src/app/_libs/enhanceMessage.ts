import { Message } from "ai/react";
import { summarization } from "../_prompts/summarization";
import { operationTypes, OperationType } from "../_types/operation";

export function enhanceMessage(message: Message, type: OperationType) {
  switch (type) {
    case operationTypes.CHAT:
      return message.content;
    case operationTypes.SUMMARY:
      return summarization(message.content);
    default:
      return message.content;
  }
}
