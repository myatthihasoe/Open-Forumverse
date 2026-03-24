import LeftSidebar from "@/components/LeftSidebar";
import Navbar from "@/components/Navbar";
import RightSidebar from "@/components/RightSidebar";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="flex">
        <LeftSidebar />
        <div className="md:w-3/5">{children}</div>
        <div className="md:w-1/5">
          <RightSidebar />
        </div>
      </div>
    </>
  );
}
