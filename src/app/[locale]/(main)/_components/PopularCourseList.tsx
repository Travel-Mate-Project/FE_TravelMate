import Card from '@/components/Card';
import {useGetPopularCourseList} from '@/hooks/withQuery/useGetPopularCourseList';
import Carousel from '@/components/Carousel';
import {RegionType} from '@/types/response';

export default function PopularCourseList() {
  const {courseList} = useGetPopularCourseList();

  return (
    <div className="w-full mx-auto py-2">
      <Carousel>
        {courseList?.map((region: RegionType) => (
          <div key={region.placeId}>
            <Card region={region} variant={'course'} />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
