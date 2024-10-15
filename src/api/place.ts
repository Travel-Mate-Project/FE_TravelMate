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

export const getCafeList = async () => {
  const res = await axiosDefault.get(END_POINT.place.cafe);
  return res.data;
};

export const getCityCodeList = async (code: number) => {
  const res = await axiosDefault.get(
    `${END_POINT.place.cityCode}?countryId=${code}`,
  );
  return res.data;
};

export const getSearchPlaceList = async (searchQuery: string, type: string) => {
  const res = await axiosDefault.get(
    `${END_POINT.search.addPlace}?searchQuery=${searchQuery}&type=${type}`,
  );
  return res.data;
};

export const getSearchStayList = async (searchQuery: string, type: string) => {
  const res = await axiosDefault.get(
    `${END_POINT.search.addStay}?searchQuery=${searchQuery}&type=${type}`,
  );
  return res.data;
};
