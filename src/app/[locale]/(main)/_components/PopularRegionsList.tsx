'use client';

import Card from '@/components/Card';
import Carousel from '@/components/Carousel';
import {useGetPopularRegionList} from '@/hooks/withQuery/useGetPopularRegionList';
import {RegionType} from '@/types/response';

export default function PopularRegionsList() {
  const {regionList} = useGetPopularRegionList();

  return (
    <div className="w-full mx-auto mt-3">
      <Carousel>
        {regionList?.map((region: RegionType) => (
          <div key={region.placeId}>
            <Card region={region} variant={'region'} />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
