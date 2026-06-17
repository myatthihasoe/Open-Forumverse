export const dynamic = "force-static";
export const revalidate = 10;

import DataRenderer from "@/components/DataRenderer";
import { headers } from "next/headers";
import Link from "next/link";
import TechNewsCard from "./components/TechNewsCard";
import GetTechNews from "@/lib/actions/GetTechNews";

export const metadata = {
  title: "Open Forumverse | Tech News",
  description: "Latest technology articles from DEV",
};

// async function getTechNews() {
//   const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
//   await delay(2000)

//   // const headerList = await headers();
//   // const host = headerList.get("host");
//   // const protocol = headerList.get("x-forwarded-proto") || "http";

//   // if (!host) {
//   //   return {
//   //     success: false,
//   //     data: [],
//   //     message: "Unable to resolve app host",
//   //   };
//   // }

//   // const response = await fetch(`${protocol}://${host}/api/tech-news`);

//   // Fetch directly from the source so the build worker can hit it safely
//   const response = await fetch("https://dev.to/api/articles?per_page=10");

//   if (!response.ok) {
//     return {
//       success: false,
//       data: [],
//       message: "Failed to load tech news",
//     };
//   }

//   // return (await response.json()) as TechNewsResponse;
//   const articles = (await response.json()) as DevToArticle[];
//   return {
//     success: true,
//     data: articles,
//   } satisfies TechNewsResponse;
// }

// function shuffleArray<T>(array: T[]): T[] {
//   const shuffled = [...array];
//   for (let i = shuffled.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
//   }
//   return shuffled;
// }

export default async function TechNewsPage() {
  const { success, data, message } = await GetTechNews();
  const articles = data?.articles || [];

  return (
    <>
      <div className="flex items-center justify-between p-5">
        <h1 className="text-3xl font-bold">Tech News</h1>
      </div>
      <DataRenderer
        success={success}
        data={articles}
        errorMessage={message}
        render={(articles) =>
          articles.map((article) => (
            <TechNewsCard key={article.id} article={article} />
          ))
        }
      />
    </>
  );
}
