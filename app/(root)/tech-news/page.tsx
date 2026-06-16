export const dynamic = "force-static";
export const revalidate = 10;

import DataRenderer from "@/components/DataRenderer";
import { headers } from "next/headers";
import Link from "next/link";
import TechNewsCard from "./components/TechNewsCard";

export type DevToArticle = {
  id: number;
  title: string;
  description: string;
  url: string;
  readable_publish_date: string;
  positive_reactions_count: number;
  comments_count: number;
  cover_image?: string | null;
  tag_list?: string[];
  user: {
    name: string;
    profile_image_90?: string;
  };
};

type TechNewsResponse = {
  success: boolean;
  data: DevToArticle[];
  message?: string;
};

export const metadata = {
  title: "Open Forumverse | Tech News",
  description: "Latest technology articles from DEV",
};

async function getTechNews() {
  // const headerList = await headers();
  // const host = headerList.get("host");
  // const protocol = headerList.get("x-forwarded-proto") || "http";

  // if (!host) {
  //   return {
  //     success: false,
  //     data: [],
  //     message: "Unable to resolve app host",
  //   };
  // }

  // const response = await fetch(`${protocol}://${host}/api/tech-news`);

  // Fetch directly from the source so the build worker can hit it safely
    const response = await fetch("https://dev.to/api/articles?tag=tech&per_page=10");

  if (!response.ok) {
    return {
      success: false,
      data: [],
      message: "Failed to load tech news",
    };
  }

  return (await response.json()) as TechNewsResponse;
}

export default async function TechNewsPage() {
  const { success, data, message } = await getTechNews();

  console.log("Dev.to Data:",
    data,
    success,
    message
  )

  return (
    <>
      <div className="flex items-center justify-between p-5">
        <h1 className="text-3xl font-bold">Tech News</h1>
      </div>
      <DataRenderer<DevToArticle>
        success={success}
        data={data}
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
