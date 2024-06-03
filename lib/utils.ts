import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import he from 'he';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Function to decode transcript
export function decodeTranscript(text: string): string {
  return he.decode(text);
}

export const sleeper = () => {
  return new Promise(resolve => setTimeout(resolve, 2000));
};