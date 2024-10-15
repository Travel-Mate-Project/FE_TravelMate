import Card from '@/components/Card';
import Carousel from '@/components/Carousel';
import {RegionType} from '@/types';

export default function PopularPlaceList<T extends RegionType>({
  data,
}: {
  data: T[];
}) {
  return (
    <div className="w-full mx-auto py-2">
      <Carousel>
        {data?.map((region: T) => (
          <div key={region.placeId}>
            <Card region={region} variant={'place'} />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
