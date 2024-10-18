import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const truncateText = (text: string, length: number) => {
  if (text.length <= length) {
    return text;
  }
  return text.slice(0, length) + "...";
};

export function isBase64Image(imageData: string) {
  const base64Regex = /^data:image\/(png|jpe?g|gif|webp);base64,/;
  return base64Regex.test(imageData);
}

export const checkAvg = (data: any[]) => {
  let totalMarks = 0;
  let obtainedMarks = 0;

  // Flatten the data and aggregate totals
  data.forEach(userEntries => {
    userEntries.forEach((entry: any) => {
      totalMarks += entry.total;
      obtainedMarks += entry.obtained;
    });
  });

  // Calculate the average percentage
  const averagePercentage = totalMarks > 0 ? (obtainedMarks / totalMarks) * 100 : 0;

  return averagePercentage;
};
