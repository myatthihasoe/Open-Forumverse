import { MDXRemote } from "next-mdx-remote/rsc";
import { Code } from "bright";
import remarkGfm from "remark-gfm";

Code.theme = {
  light: "github-light",
  dark: "github-dark",
  lightSelector: "html.light",
};

function cleanContentForMarkdown(rawString: string) {
  if (!rawString) return "";

  return (
    rawString
      // 1. Decode common HTML entities that break parser syntax
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&")
      // 2. Remove plain HTML container tags like <p>, </p>, <div>, etc.,
      // while keeping content intact so markdown syntax isn't choked by them.
      .replace(/<\/?[a-zA-ve-z0-9]+(?=\s|>)[^>]*>/gi, "")
      // 3. Fix escaped backticks from broken rich-text editors (e.g., `\`\`` -> ```)
      .replace(/\\`\\`\\`/g, "```")
      .replace(/\\`/g, "`")
  );
}

function Preview({ content }: { content: string }) {
  const safeContent = cleanContentForMarkdown(content);
  return (
    <div className="prose prose-invert prose-headings:text-gray-200 prose-p:text-gray-400 prose-ul:text-gray-400 prose-ol:text-gray-400 max-w-none">
      <MDXRemote
        source={safeContent}
        options={{
          mdxOptions: {
            format: "md", // 2. Forces MDX to parse as safe, vanilla markdown
            remarkPlugins: [remarkGfm], // 3. Enables GitHub tables, lists, and strikethroughs
          },
        }}
        components={{
          pre: (props) => {
            return <Code {...props} lineNumbers className="shadow-light-200" />;
          },
        }}
      ></MDXRemote>
    </div>
  );
}

export default Preview;
