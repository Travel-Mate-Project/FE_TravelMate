import {axiosDefault, axiosServer} from '@/api/axios/axiosInstance';
import {END_POINT} from '@/constants/endPoint';
import {SignInReq, SignUpReq} from '@/types';

export const signUp = async (signUpData: SignUpReq) => {
  const res = await axiosDefault.post(END_POINT.auth.signUp, signUpData);
  return res.data;
};

export const signIn = async (SignInData: SignInReq) => {
  const res = await axiosServer.post(END_POINT.auth.signIn, SignInData);
  return res.data;
};
