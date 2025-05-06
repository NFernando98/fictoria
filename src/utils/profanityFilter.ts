// Common inappropriate words to filter
const inappropriateWords = [
  'profanity', 'slur', 'offensive', // Placeholder words - in production, this would be a more comprehensive list
];

export const containsProfanity = (text: string): boolean => {
  const words = text.toLowerCase().split(/\s+/);
  return words.some(word => inappropriateWords.includes(word));
};

// No need to sanitize bio - just return as is
export const sanitizeBio = (text: string): string => text;