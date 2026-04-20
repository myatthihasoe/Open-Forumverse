import { StaticImageData } from "next/image";
import { ReactNode } from "react";

export type InputProps = {
  placeholder?: string;
  label?: string;
  text?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export type ButtonProps = {
  children: ReactNode;
  icon?: string | StaticImageData;
  variant?: "normal" | "outline";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonLinkProps = {
  children: ReactNode;
  icon?: string | StaticImageData;
  href: string;
  variant?: "normal" | "outline";
};
