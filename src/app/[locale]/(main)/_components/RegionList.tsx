'use client';

import Card from '@/components/Card';
import Carousel from '@/components/Carousel';
import {useGetRegionList} from '@/hooks/withQuery/useGetRegionList';
import {RegionType} from '@/types/response';

export default function RegionList() {
  const {regionList} = useGetRegionList();

  return (
    <div className="max-w-7xl mx-auto py-8">
      <Carousel>
        {regionList.map((region: RegionType) => (
          <div key={region.placeId}>
            <Card region={region} variant={'region'} />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
