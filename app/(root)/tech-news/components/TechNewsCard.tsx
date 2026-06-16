import Link from "next/link";
import { AiFillLike } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { DevToArticle } from "../page";

function TechNewsCard({ article }: { article: DevToArticle }) {
  const tags = article.tag_list?.slice(0, 3) || [];

  return (
    <article className="bg-card rounded-xl my-3 overflow-hidden ">
      {article.cover_image && (
        <div
          className="h-48 bg-cover bg-center"
          style={{ backgroundImage: `url(${article.cover_image})` }}
          aria-label={article.title}
        />
      )}
      <div className="space-y-5 px-10 py-6">
        <div className="space-y-2">
          <Link
            href={article.url}
            target="_blank"
            rel="noreferrer"
            className="hover:text-main"
          >
            <h2 className="text-xl font-bold">{article.title}</h2>
          </Link>
          <p className="line-clamp-2 text-sm text-gray-300">
            {article.description}
          </p>
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-primary px-3 py-1 text-sm text-gray-200"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between text-sm text-gray-300">
          <span>
            {article.user.name}{" "}
            <i className="ml-2 text-gray-500">
              {article.readable_publish_date}
            </i>
          </span>
          <div className="flex items-center gap-4">
            <span>
              <AiFillLike />
              {article.positive_reactions_count} Likes
            </span>
            <span>
              <FaComment />
              {article.comments_count} Comments
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default TechNewsCard;
