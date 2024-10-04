export const END_POINT = {
  auth: {
    signIn: '/auth/login', // 토큰 및 리프레쉬 토큰 보안 강화를 위해 next.js 서버단에서 요청 보내도록 설정함
    signUp: '/api/v1/auth/signup',
  },
  place: {
    regions: '/place/regions',
    place: '/place/place',
    course: '/place/course',
    cityCode: '/cityCode',
  },
} as const;
