export const dynamic = "force-static";
export const revalidate = 10;

import DataRenderer from "@/components/DataRenderer";
import TechNewsCard from "./components/TechNewsCard";
import GetTechNews from "@/lib/actions/GetTechNews";

export const metadata = {
  title: "Open Forumverse | Tech News",
  description: "Latest technology articles from DEV",
};

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
