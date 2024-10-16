export const END_POINT = {
  auth: {
    signIn: '/auth/login', // 토큰 및 리프레쉬 토큰 보안 강화를 위해 next.js 서버단에서 요청 보내도록 설정함
    signUp: '/api/v1/auth/signup',
  },
  place: {
    regions: '/api/v1/place/regions',
    place: '/api/v1/place/place',
    course: '/api/v1/place/course',
    cafe: '/api/v1/place/cafe',
    restaurant: '/api/v1/place/restaurant',
    stay: '/api/v1/place/stay',
    cityCode: '/api/v1/cityCode',
  },
  search: {
    addPlace: '/api/v1/addPlace',
    addStay: '/api/v1/addStay',
  },
  trip: {
    optimizeTrip: '/api/v1/trip/optimize',
  },
  myPage: {
    plan: '/api/v1/myPage/plan',
  },
} as const;
