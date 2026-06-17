import { TechNewsArticle } from "@/lib/actions/GetTechNews";
import Link from "next/link";
import Image from "next/image";
import { AiFillLike } from "react-icons/ai";
import { FaClock, FaComment } from "react-icons/fa";

function TechNewsCard({ article }: { article: TechNewsArticle }) {
  const profileImage = article.user?.profile_image_90 || "/profile.jpg";
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

        <div className="flex items-center justify-between pt-2 border-t border-gray-700">
          <div className="flex items-center space-x-3 text-[14px] text-gray-300">
            <Image
              src={profileImage}
              width={30}
              height={30}
              className="aspect-square rounded-full object-cover"
              alt={article.user?.name || "Author"}
            />
            <span>
              {article.user?.name || article.user?.username} •{" "}
              {article.readable_publish_date}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-[14px] text-gray-300">
              <AiFillLike />
              <span>{article.public_reactions_count}</span>
            </div>
            <div className="flex items-center space-x-1 text-[14px] text-gray-300">
              <FaComment />
              <span>{article.comments_count}</span>
            </div>
            <div className="flex items-center space-x-1 text-[14px] text-gray-300">
              <FaClock />
              <span>{article.reading_time_minutes} min read</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default TechNewsCard;
