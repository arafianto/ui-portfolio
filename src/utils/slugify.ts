export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    // remove apostrophes and other punctuation except spaces and dashes
    .replace(/[^\w\s-]/g, '')
    // replace whitespace and underscores with a single dash
    .replace(/[\s_]+/g, '-')
    // collapse multiple dashes
    .replace(/-+/g, '-')
    // trim starting/ending dashes
    .replace(/^-+|-+$/g, '');
};
