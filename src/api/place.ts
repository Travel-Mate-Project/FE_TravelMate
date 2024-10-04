import {axiosDefault} from '@/api/axios/axiosInstance';
import {END_POINT} from '@/constants/endPoint';

export const getRegionList = async () => {
  const res = await axiosDefault.get(END_POINT.place.regions);
  return res.data;
};

export const getPlaceList = async () => {
  const res = await axiosDefault.get(END_POINT.place.place);
  return res.data;
};

export const getCourseList = async () => {
  const res = await axiosDefault.get(END_POINT.place.course);
  return res.data;
};

export const getCityCodeList = async (code: number) => {
  const res = await axiosDefault.get(
    `${END_POINT.place.cityCode}?countryId=${code}`,
  );
  return res.data;
};
