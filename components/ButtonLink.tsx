import { ButtonLinkProps } from "@/types/type.data";
import Link from "next/link";
export default function ButtonLink({
  children,
//   icon,
  href,
  variant = "normal",
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      {...props}
      type="submit"
      className={`flex w-full space-x-4 px-5 py-2 rounded-lg border-main items-center justify-center border-2 ${variant === "normal" ? "bg-main text-white" : "bg-primary text-white"}`}
    >
      {/* {icon && <Image src={icon} alt="google-logo" width={20} height={20} />} */}
      <span>{children}</span>
    </Link>
  );
}
