"use client";
import Button from "@/components/Button";
import Editor from "@/components/Editor";
import Input from "@/components/Input";
import TagCard from "@/components/TagCard";
import { useState } from "react";
import { toast, Bounce } from "react-toastify";

export default function QuestionForm() {
  const [value, setValue] = useState("");
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

  return (
    <>
      <div className="space-y-5">
        <h1 className="text-2xl font-bold">Break The Silence . . .</h1>
        <Input
          label="Title"
          text="Describe your discussion title with short name! "
        />
        <Editor
          value={value}
          onChange={(v) => setValue(v)}
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
        <Button>Create New Discussion</Button>
      </div>
    </>
  );
}
