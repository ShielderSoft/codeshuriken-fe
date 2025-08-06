import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Extract repository name from URL
export function getRepositoryName(repoUrl: string | undefined): string {
  if (!repoUrl) return 'Unknown';
  const match = repoUrl.match(/github\.com\/[^\/]+\/([^\/]+)\.git$/);
  return match ? match[1] : repoUrl.split('/').pop()?.replace('.git', '') || 'Unknown';
}
