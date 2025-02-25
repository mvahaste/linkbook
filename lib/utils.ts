import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function titleToAvatar(title: string): string {
  const words = title.replace(/[^a-zA-Z0-9]/g, "").split(/(?=[A-Z])/);

  const initials = words.map((word) => word.charAt(0).toUpperCase()).join("");

  return initials.slice(0, 2);
}

export interface Bookmark {
  id: number;
  url: string;
  title: string;
  description?: string;
  image?: string;
  tags: Tag[];
  created_at: Date;
}

export interface Tag {
  id: number;
  label: string;
  color?: string;
  created_at: Date;
}
