"use client";

import Button from "@/components/Button";
import Editor from "@/components/Editor";
import AnswerCreate from "@/lib/actions/AnswerCreate";
import generateAiAnswerAction from "@/lib/actions/GenerateAiAnswerAction";
import ROUTES from "@/routes";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Bounce, toast } from "react-toastify";

function AnswerForm({
  questionId,
  questionTitle,
  questionContent,
}: {
  questionId: string;
  questionTitle: string;
  questionContent: string;
}) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const generateAiAnswer = async () => {
    if (loading) return;

    try {
      setLoading(true);
      const { success, data, message } = await generateAiAnswerAction({
        title: questionTitle,
        content: questionContent,
        userAnswer: content,
      });
      if (success && data) {
        const { answer = "" } = data || {};
        setContent(answer);
        return;
      }

      toast.error(message || "Could not generate an AI answer right now.", {
        position: "bottom-left",
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
        console.log("Error generating AI answer:", e);
        toast.error(e.message, {
          position: "bottom-left",
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
    } finally {
      setLoading(false);
    }
  };
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const { success, data } = await AnswerCreate({
        questionId,
        content,
      });
      if (success && data) {
        setContent("");
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
            console.log("AnswerForm:", v);
            setContent(v);
          }}
        />
      </div>
      <div className="flex justify-end">
        <div className="flex space-x-3 w-[50%] ">
          <div className="w-[50%]">
            {content.length > 10 && (
              <Button
                variant="outline"
                type="button"
                disabled={loading}
                onClick={generateAiAnswer}
              >
                {loading ? "Loading.." : "Generate AI Answer"}
              </Button>
            )}
          </div>
          <div className="w-[50%]">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Answer"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default AnswerForm;
