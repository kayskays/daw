import { formatDistanceToNow } from 'date-fns';

// Format timestamp to relative time (e.g. "2 hours ago")
export const formatRelativeTime = (timestamp: string): string => {
  return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
};

// Format number to a readable format (e.g. 1.2k, 3.5M)
export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  } else {
    return num.toString();
  }
};