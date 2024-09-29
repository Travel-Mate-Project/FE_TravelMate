import {useQuery} from '@tanstack/react-query';
import {QUERY_KEY} from '@/constants/queryKey';
import {getCourseList} from '@/api';

export const useGetPopularCourseList = () => {
  const {data: courseList, isLoading} = useQuery({
    queryKey: [QUERY_KEY.PLACE.COURSE],
    queryFn: getCourseList,
  });

  return {courseList, isLoading};
};
