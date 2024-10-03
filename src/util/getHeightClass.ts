export const getMobileHeightClass = (height: number | string): string => {
  if (typeof height === 'number') {
    return `h-[${height}%]`;
  }
  return height;
};

export const getDesktopHeightClass = (height: number | string): string => {
  if (typeof height === 'number') {
    return `md:h-[${height}px]`;
  }
  return height;
};
