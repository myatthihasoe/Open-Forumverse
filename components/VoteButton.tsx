"use client";

import React, { useState } from "react";

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
  const handleVote = (voteType: "upvote" | "downvote") => {
    setUpvotes(100);
    setDownvotes(100);
    setUserVote(voteType);
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