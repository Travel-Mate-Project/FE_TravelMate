import {axiosDefault} from '@/api/axios/axiosInstance';
import {END_POINT} from '@/constants/endPoint';
import {SignUpReq} from '@/types/request';

export const signUp = async (signUpData: SignUpReq) => {
  const res = await axiosDefault.post(END_POINT.auth.signUp, signUpData);
  return res.data;
};
