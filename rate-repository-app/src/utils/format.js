export const thousands = (count) => {
  return count >= 1000 ? (count / 1000).toFixed(1) + 'k' : String(count);
};