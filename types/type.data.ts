import { StaticImageData } from "next/image";
import { ReactNode } from "react";

export type InputProps = {
  placeholder?: string;
  label?: string;
};

export type ButtonProps = {
  children: ReactNode;
  icon?: string | StaticImageData;
  type?: "normal" | "outline";
};
