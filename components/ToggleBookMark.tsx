"use client";

import ToggleBookMarkAction from "@/lib/actions/ToggleBookMarkAction";
import React, { useState } from "react";
import { Bounce, toast } from "react-toastify";

function ToggleBookMark() {
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = async () => {
    try {
      await ToggleBookMarkAction();
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
    <div>
      {!isSaved ? (
        <button onClick={handleSave} className="px-3 py-2 rounded-lg bg-main">
          save
        </button>
      ) : (
        <button
          onClick={handleSave}
          className="px-3 py-2 rounded-lg border-[1px] border-main"
        >
          unsave
        </button>
      )}
    </div>
  );
}

export default ToggleBookMark;