export const END_POINT = {
  auth: {
    signIn: '/api/v1/auth/login',
    signUp: '/api/v1/auth/signup',
  },
  place: {
    regions: '/place/regions',
    place: '/place/place',
    course: '/place/course',
  },
} as const;
