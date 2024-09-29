import Card from '@/components/Card';
import {useGetPopularPlaceList} from '@/hooks/withQuery/useGetPopularPlaceList';
import Carousel from '@/components/Carousel';
import {RegionType} from '@/types/response';

export default function PopularPlaceList() {
  const {placeList} = useGetPopularPlaceList();

  console.log('PopularPlaceList', placeList);

  return (
    <div className="w-full mx-auto py-2">
      <Carousel>
        {placeList?.map((region: RegionType) => (
          <div key={region.placeId}>
            <Card region={region} variant={'place'} />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
