import Link from "next/link";
import { ReactNode } from "react";

export default function TagCard({href, children}:{href: string, children: ReactNode}) {
  return (
    <Link
      href={href}
      className="w-[100px] rounded-xl bg-tertiary text-gray-300 px-4 py-2"
    >
      {children}
    </Link>
  );
}
