"use client";

import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Link from "next/link";
import ROUTES from "@/routes";

interface ActionsProps {
  type: "question" | "answer";
  typeId: string;
  showActions: boolean;
}

function Actions({ type, typeId, showActions }: ActionsProps) {
  if (!showActions) {
    return null;
  }

  const deleteAction = async () => {
    // Empty logic for now - will be implemented later
    console.log(`action for ${type} with id: ${typeId}`);
  };

  return (
    <div className="flex items-center gap-2">
      {type === "question" && (
        <Link
          href={ROUTES.DISCUSSION_DETAIL(typeId) + "/edit"}
          className="flex items-center gap-1 text-sm text-gray-400 hover:text-main transition-colors"
        >
          <FaEdit className="w-4 h-4" />
          <span>Edit</span>
        </Link>
      )}
      <button
        onClick={deleteAction}
        className="flex items-center gap-1 text-sm text-gray-400 hover:text-red-500 transition-colors"
        type="button"
      >
        <FaTrash className="w-4 h-4" />
        <span>Delete</span>
      </button>
    </div>
  );
}

export default Actions;