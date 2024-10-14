export const convertTypeLang = (type: string) => {
  switch (type) {
    case 'place':
      return '관광지';
    case 'restaurant':
      return '음식점';
    case 'cafe':
      return '카페';
    case 'stay':
      return '숙소';
    default:
      return '';
  }
};
