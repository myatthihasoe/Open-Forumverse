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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const { success, data } = await AnswerCreate({
        questionId,
        content,
      });
      setContent("");
      if (success && data) {
        toast.success("Answer submitted successfully.", {
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
        return router.push(ROUTES.DISCUSSION_DETAIL(questionId));
      }
      toast.error("Could not submit your answer. Please try again.", {
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
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <form onSubmit={submit}>
      <div className="mt-3">
        <Editor
          label="Any Question ?"
          value={content}
          onChange={(v) => {
            console.log("AnswerForm:", v)
            setContent(v)}}
        />
      </div>
      <div className="flex justify-end">
        <div className="max-w-48">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Answer"}
          </Button>
        </div>
      </div>
    </form>
  );
}

export default AnswerForm;
