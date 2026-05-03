import { handleErrorResponse } from "./response";

interface FetchOption extends RequestInit {
  timeout?: number;
}
export default async function fetchHandler(
  url: string,
  options: FetchOption = {}
) {
  const { timeout = 5000, headers: customHeaders, ...restOptions } = options;
  const controller = new AbortController();

  const id = setTimeout(() => {
    controller.abort();
  }, timeout);
  const defaultHeaders = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const headers = {
    ...defaultHeaders,
    ...customHeaders,
  };

  const config = {
    ...restOptions,
    headers,
    signal: controller.signal,
  };

  try {
    const response = await fetch(url, config);
    clearTimeout(id);
    if (!response.ok) {
      throw new Error("HTTP ERROR " + response.status);
    }
    return response;
  } catch (e) {
    if (e instanceof Error && e.name === "AbortError") {
      throw new Error("Request timed out!");
    } else {
      return handleErrorResponse(e);
    }
  }
}
