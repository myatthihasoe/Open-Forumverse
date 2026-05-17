"use client";
import Button from "@/components/Button";
import Editor from "@/components/Editor";
import Input from "@/components/Input";
import TagCard from "@/components/RemovableTagCard";
import RemovableTagCard from "@/components/RemovableTagCard";
import { QuestionWithTagsType } from "@/database/question.model";
import { QuestionCreate } from "@/lib/actions/QuestionCreate.action";
import ROUTES from "@/routes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { QuestionEdit } from "@/lib/actions/QuestionEdit.action";
import { toast, Bounce } from "react-toastify";

export default function QuestionForm({
  question,
  isEdit = false,
}: {
  question?: QuestionWithTagsType;
  isEdit?: boolean;
}) {
  const [title, setTitle] = useState(question?.title ?? "");
  const [content, setContent] = useState(question?.content ?? "");
  const [tags, setTags] = useState<string[]>(
    question?.tags?.map((tag) => tag?.name) ?? []
  );
  const [newTag, setNewTag] = useState("");
  // const [error, setError] = useState("");

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
        setNewTag("");
        // setError("");
        e.preventDefault();
      } else {
        toast.error(`${newTag} already exists!`, {
          position: "bottom-left",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
        // setError("Tag already exists");
        e.preventDefault();
      }
    }
  };

  const router = useRouter();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (isEdit && question) {
        const result = await QuestionEdit({
          questionId: String(question._id),
          title,
          content,
          tags,
        });
        if (result.success && result.data) {
          toast.success("Question Updated successfully.", {
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
          return router.push(
            ROUTES.DISCUSSION_DETAIL(String(result.data?._id))
          );
        }
        return;
      }
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
        return router.push(ROUTES.DISCUSSION_DETAIL(String(result.data?._id)));
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

  // const removeTag = (tag:string)=>{
  //   setTags((prevTags)=>{
  //     return prevTags.filter(t=>t!==tag)
  //   })
  // }

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
          text="Please press a new tag"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onKeyDown={handleTagKeyDown}
        />
        {/* {error && <p className="text-sm text-red-600">{error}</p>} */}
        <div className="mt-5 space-x-2 flex">
          {tags.map((tag, index) => (
            <RemovableTagCard
              key={index}
              // onRemove={()=> removeTag(tag)}
              onRemove={() =>
                setTags((prevTags) => prevTags.filter((t) => t !== tag))
              }
            >
              {tag}
            </RemovableTagCard>
          ))}
        </div>
        <Button type="submit">
          {isEdit ? "Update" : "Create New"} Discussion
        </Button>
      </form>
    </>
  );
}
