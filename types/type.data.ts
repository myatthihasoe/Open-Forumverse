import { StaticImageData } from "next/image";
import { ReactNode } from "react";

export type InputProps = {
  placeholder?: string;
  label?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export type ButtonProps = {
  children: ReactNode;
  icon?: string | StaticImageData;
  variant?: "normal" | "outline";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
