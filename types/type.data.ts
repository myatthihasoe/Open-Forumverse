import { StaticImageData } from "next/image";
import { ReactNode } from "react";

export type InputProps = {
  placeholder?: string;
  label?: string;
};

export type ButtonProps = {
  children: ReactNode;
  icon?: string | StaticImageData;
  variant?: "normal" | "outline";
  
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
