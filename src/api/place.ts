import {axiosDefault} from '@/api/axios/axiosInstance';
import {END_POINT} from '@/constants/endPoint';

export const getRegions = async () => {
  const res = await axiosDefault.get(END_POINT.place.regions);
  return res.data;
};
