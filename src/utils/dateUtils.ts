export const formatDate = (date: Date): string => {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return 'Invalid date';
  }
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatTime = (date: Date): string => {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return 'Invalid time';
  }
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatDateTime = (date: Date): string => {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return 'Invalid date/time';
  }
  return `${formatDate(date)} at ${formatTime(date)}`;
};

export const isOverdue = (dueDate: Date): boolean => {
  if (!(dueDate instanceof Date) || isNaN(dueDate.getTime())) {
    return false;
  }
  return new Date() > dueDate;
};

export const isToday = (date: Date): boolean => {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return false;
  }
  const today = new Date();
  return date.getDate() === today.getDate() &&
         date.getMonth() === today.getMonth() &&
         date.getFullYear() === today.getFullYear();
};

export const isTomorrow = (date: Date): boolean => {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return false;
  }
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return date.getDate() === tomorrow.getDate() &&
         date.getMonth() === tomorrow.getMonth() &&
         date.getFullYear() === tomorrow.getFullYear();
};

export const getRelativeDateText = (date: Date): string => {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return 'Invalid date';
  }
  if (isToday(date)) return 'Today';
  if (isTomorrow(date)) return 'Tomorrow';
  return formatDate(date);
}; 