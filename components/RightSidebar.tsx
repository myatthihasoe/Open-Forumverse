import GetTechNews from "@/lib/actions/GetTechNews";
import ROUTES from "@/routes";
import Link from "next/link";
import { AiFillQuestionCircle } from "react-icons/ai";
import {
  FaLaravel,
  FaNode,
  FaPython,
  FaQuestionCircle,
  FaReact,
  FaVuejs,
} from "react-icons/fa";
import { RiNextjsFill } from "react-icons/ri";
import DataRenderer from "./DataRenderer";
import GetPopularQuestions from "@/lib/actions/GetPopularQuestions";
import GetPopularTags from "@/lib/actions/GetPopularTags";
import Image from "next/image";

export default async function RightSidebar() {
  const { success, data, message } = await GetPopularQuestions();
  const { questions = [] } = data || {};
  const {
    success: successTags,
    data: dataTags,
    message: errorTag,
  } = await GetPopularTags();
  const { tags = [] } = dataTags || {};
  const {
    success: successTechNews,
    data: dataTechNews,
    message: errorTechNews,
  } = await GetTechNews();
  const { articles = [] } = dataTechNews || {};
  // Get first 10 articles
  const techNewsTitles = articles.slice(0, 10);
  
  return (
    <div className="p-5">
      <div>
        <h1 className="text-xl font-bold">Popular Discussions</h1>
        <div className="space-y-3 mt-2 p-2">
          <DataRenderer
            success={success}
            data={questions}
            errorMessage={message}
            render={(questions) =>
              questions.map((question) => (
                <Link
                  key={String(question._id)}
                  href={ROUTES.DISCUSSION_DETAIL(String(question._id))}
                  className="my-3 flex items-center space-x-2"
                >
                  <span className="text-xl text-main">
                    <AiFillQuestionCircle />
                  </span>
                  <span className="line-clamp-2 text-sm">{question.title}</span>
                </Link>
              ))
            }
          />
        </div>
      </div>
      <div className="mt-4">
        <h1 className="text-xl font-bold">Popular Tags</h1>
        <DataRenderer
          success={successTags}
          data={tags}
          errorMessage={errorTag}
          render={(tags) =>
            tags.map((tag) => (
              <Link
                href={ROUTES.TAG_DETAILS(String(tag._id))}
                className="mt-7 space-y-5 pl-3"
                key={String(tag._id)}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-xl" style={{ color: "#61DAFB" }}>
                    <Image
                      alt="logo"
                      width={30}
                      height={30}
                      src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${tag.name.toLocaleLowerCase()}/${tag.name.toLocaleLowerCase()}-original.svg`}
                    />
                  </span>
                  <span className="line-clamp-2 text-[16px]">{tag.name}</span>
                </div>
              </Link>
            ))
          }
        />
      </div>
      <div className="mt-5">
        <h1 className="text-xl font-bold">Tech News</h1>
        <div className="mt-5 space-y-3 pl-3">
          <DataRenderer
            success={successTechNews}
            data={techNewsTitles}
            errorMessage={errorTechNews}
            render={(articles) =>
              articles.map((article) => (
                <a
                  key={article.id}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block line-clamp-1 text-sm hover:text-main transition-colors my-3 underline "
                >
                  {article.title}
                </a>
              ))
            }
          />
        </div>
      </div>
    </div>
  );
}
