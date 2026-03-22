import { ButtonProps } from "@/types/type.data";
import Image from "next/image";

export default function Button({
  children,
  icon,
  type = "normal",
}: ButtonProps) {
  return (
    <button
      className={`flex w-full space-x-4 px-5 py-2 rounded-lg border-main items-center justify-center border-2 ${type === "normal" ? "bg-main " : "bg-primary "}`}
    >
      {icon && <Image src={icon} alt="google-logo" width={20} height={20} />}
      <span>{children}</span>
    </button>
  );
}
