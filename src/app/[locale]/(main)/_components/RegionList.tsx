'use client';

import {useGetRegionList} from '@/hooks/withQuery/useGetRegionList';
import {RegionType} from '@/types/response';

export default function RegionList() {
  const {regionList} = useGetRegionList();

  return (
    <div>
      {regionList.map((region: RegionType) => (
        <div key={region.placeId}>{region.name}</div>
      ))}
    </div>
  );
}
