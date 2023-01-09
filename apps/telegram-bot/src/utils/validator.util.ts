export const validateWord = (word: string): boolean => {
  return /^[a-zA-Z- '`]{1,25}$/g.test(word);
};
