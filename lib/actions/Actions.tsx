"use client";

import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Link from "next/link";
import ROUTES from "@/routes";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Bounce, toast } from "react-toastify";
import DeleteQuestion from "./DeleteQuestion";
import DeleteAnswer from "./DeleteAnswer";

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
    // console.log(`action for ${type} with id: ${typeId}`);
    try {
      let result;
      if (type === "question") {
        result = await DeleteQuestion({
          questionId: typeId,
        });
      } else {
        result = await DeleteAnswer({
          answerId: typeId,
        });
      }

      if (result.success) {
        toast.success("Delete successfully.", {
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
      } else {
        // Server action returned an error object
        toast.error("Failed to delete", {
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
    } catch (e) {
      // Handle unexpected runtime errors
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
      <AlertDialog>
        <AlertDialogTrigger className="flex space-x-2 items-center text-sm">
          <FaTrash className="w-3 h-3" />
          <span>Delete</span>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your{" "}
              {type} and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={deleteAction}
              className="bg-red-500 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default Actions;
