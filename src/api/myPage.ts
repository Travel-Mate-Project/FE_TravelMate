import {axiosDefault} from '@/api/axios/axiosInstance';
import {END_POINT} from '@/constants/endPoint';

export const getMyPlanList = async () => {
  const {data} = await axiosDefault.get(END_POINT.myPage.plan);
  return data;
};
