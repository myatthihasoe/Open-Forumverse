"use client";
import Button from "@/components/Button";
import Editor from "@/components/Editor";
import Input from "@/components/Input";
import TagCard from "@/components/TagCard";
import { QuestionCreate } from "@/lib/actions/QuestionCreate.action";
import ROUTES from "@/routes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast, Bounce } from "react-toastify";

export default function QuestionForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>(["NextJs", "React", "Vue"]);
  const [newTag, setNewTag] = useState("");
  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
        setNewTag("");
      } else {
        toast.error("Tag already exists!", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }
    }
  };

  const router = useRouter();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await QuestionCreate({
        title,
        content,
        tags,
      });
      if (result.success && result.data) {
        toast.success("Question created successfully.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
        return router.push(ROUTES.DISCUSSION_DETAIL(result.data?._id));
      }
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }
    }
  };

  return (
    <>
      <form className="space-y-5" onSubmit={submit}>
        <h1 className="text-2xl font-bold">Break The Silence . . .</h1>
        <Input
          label="Title"
          text="Describe your discussion title with short name! "
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <Editor
          value={content}
          onChange={(v) => setContent(v)}
          label="Discussion Content"
          
        />
        {/* {newTag} */}
        <Input
          label="Tags"
          text="Please press a new tag!"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onKeyDown={handleTagKeyDown}
        />
        <div className="mt-5 space-x-2">
          {tags.map((tag, index) => (
            <TagCard key={index} href={`/?filter=${tag}`}>
              {tag}
            </TagCard>
          ))}
        </div>
        <Button type="submit">Create New Discussion</Button>
      </form>
    </>
  );
}
