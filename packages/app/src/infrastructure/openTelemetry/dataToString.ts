import { Stream } from "node:stream";

export function dataToString(data: unknown): string {
  if (!data) {
    return "";
  }

  if (data instanceof Stream) {
    return "stream";
  }

  if (typeof data === "string") {
    return data;
  }

  try {
    return JSON.stringify(data);
  } catch {
    return "";
  }
}
