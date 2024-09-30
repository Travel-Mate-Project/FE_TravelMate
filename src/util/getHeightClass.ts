export const getHeightClass = (height: number | string): string => {
  if (typeof height === 'number') {
    return `h-[${height}%]`;
  }
  return height;
};
