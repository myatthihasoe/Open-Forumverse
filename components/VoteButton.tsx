"use client";

import GetUserVote from "@/lib/actions/GetUserVote";
import VoteAction from "@/lib/actions/VoteAction";
import React, { useEffect, useState } from "react";
import { toast, Bounce } from "react-toastify";

function VoteButtons({
  typeId,
  type,
  initialUpvotes,
  initialDownvotes,
}: {
  typeId: string;
  type: "question" | "answer";
  initialUpvotes: number;
  initialDownvotes: number;
}) {
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [downvotes, setDownvotes] = useState(initialDownvotes);
  const [userVote, setUserVote] = useState<"upvote" | "downvote" | null>(null);

  const showError = (message: string) => {
    toast.error(message, {
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
  };

  useEffect(() => {
    const fetchUserVote = async () => {
      try {
        const { success, data } = await GetUserVote({
          type,
          typeId,
        });
        setUserVote(success && data ? data.userVote : null);
      } catch {
        setUserVote(null);
      }
    };
    fetchUserVote();
  }, [type, typeId]);

  const handleVote = async (voteType: "upvote" | "downvote") => {
    try {
      const { success, data, message } = await VoteAction({
        type,
        typeId,
        voteType,
      });

      if (!success) {
        showError(message || "Failed to update vote");
        return;
      }

      const { upvotes = 0, downvotes = 0, userVote } = data || {};
      setUpvotes(upvotes);
      setDownvotes(downvotes);
      setUserVote(userVote ?? null);
    } catch (e) {
      if (e instanceof Error) {
        showError(e.message);
      }
    }
  };
  return (
    <div className="flex items-center space-x-2 text-xs">
      <div>
        <button
          onClick={() => handleVote("upvote")}
          className={`p-2 border-[1px] border-white space-x-2 rounded-lg ${
            userVote === "upvote" ? "border-green-300 text-green-300" : ""
          }`}
        >
          <span>{upvotes}</span>
          <span>Likes</span>
        </button>
      </div>
      <div>
        <button
          onClick={() => handleVote("downvote")}
          className={`p-2 border-[1px] border-white space-x-2 rounded-lg ${
            userVote === "downvote" ? "border-red-300 text-red-300" : ""
          }`}
        >
          <span>{downvotes}</span>
          <span>Dislikes</span>
        </button>
      </div>
    </div>
  );
}

export default VoteButtons;
