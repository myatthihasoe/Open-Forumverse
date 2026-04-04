import { ButtonProps } from "@/types/type.data";
import Image from "next/image";

export default function Button({
  children,
  icon,
  variant = "normal",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      type="submit"
      className={`flex w-full space-x-4 px-5 py-2 rounded-lg border-main items-center justify-center border-2 ${variant === "normal" ? "bg-main text-white" : "bg-primary text-white"}`}
    >
      {icon && <Image src={icon} alt="google-logo" width={20} height={20} />}
      <span>{children}</span>
    </button>
  );
}
