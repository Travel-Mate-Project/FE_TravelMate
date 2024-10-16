export const convertTypeLang = (type: string) => {
  switch (type) {
    case 'place':
      return {name: '관광지', color: '#3FB6A6'};
    case 'restaurant':
      return {name: '음식점', color: '#F57700'};
    case 'cafe':
      return {name: '카페', color: '#FFAA34'};
    case 'stay':
      return {name: '숙소', color: '#007BFF'};
    default:
      return {name: '', color: '#000000'}; // 기본값 설정
  }
};
