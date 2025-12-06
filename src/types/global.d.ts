declare global {
  type Message = {
    role: "developer" | "user" | "assistant";
    content: string;
  }
}

export {};
