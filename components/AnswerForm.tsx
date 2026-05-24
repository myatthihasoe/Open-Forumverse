"use client";

import Button from "@/components/Button";
import Editor from "@/components/Editor";
import AnswerCreate from "@/lib/actions/AnswerCreate";
import ROUTES from "@/routes";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Bounce, toast } from "react-toastify";

function AnswerForm({ questionId }: { questionId: string }) {
  const [content, setContent] = useState("");
  const router = useRouter();
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const { success, data } = await AnswerCreate({
        questionId,
        content,
      });
      if (success && data) {
        toast.success("Answer submitted successfully.", {
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
        return router.push(ROUTES.DISCUSSION_DETAIL(questionId));
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
    <form onSubmit={submit}>
      <div className="mt-3">
        <Editor
          label="Any Question ?"
          value={content}
          onChange={(v) => setContent(v)}
        />
      </div>
      <div className="flex justify-end">
        <div className="max-w-48">
          <Button type="submit">Submit Answer</Button>
        </div>
      </div>
    </form>
  );
}

export default AnswerForm;