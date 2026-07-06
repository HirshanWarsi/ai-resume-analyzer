import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function parseJsonList(value, fallback = []) {
  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    } catch {
      // fall through to simple string parsing
    }

    return value
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return fallback;
}
