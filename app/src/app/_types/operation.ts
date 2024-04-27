export const operationTypes = {
  CHAT: "CHAT",
  SUMMARY: "SUMMARY",
} as const;

export type OperationType =
  (typeof operationTypes)[keyof typeof operationTypes];
