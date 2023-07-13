import fetch from "cross-fetch";
import { APIUnavailableError } from "../types/APIUnavailableError";

// Convenience function to perform a GET HTTP call
export async function get<T>(apiUrl: string): Promise<T> {
  const userAPIResponse = await fetch(apiUrl, { method: "GET" });
  if (!userAPIResponse.ok) {
    throw new APIUnavailableError(`API is not available - ${apiUrl}`);
  }
  return userAPIResponse.json() as Promise<T>;
}
