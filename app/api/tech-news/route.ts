import { handleErrorResponse, handleSuccessResponse } from "@/lib/response";

const DEV_TO_ARTICLES_URL = "https://dev.to/api/articles?per_page=10";
const RESPONSE_DELAY_MS = 2000;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export async function GET() {
  try {
    const response = await fetch(DEV_TO_ARTICLES_URL, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch tech news");
    }

    const articles = await response.json();
    const shuffledArticles = shuffleArray(articles);

    //Delay response 2s
    await delay(RESPONSE_DELAY_MS)

    return handleSuccessResponse(shuffledArticles);
  } catch (error: unknown) {
    return handleErrorResponse(error);
  }
}
