import {getCourseList, getPlaceList, getRegionList} from '@/api';
import TripConfigurationPanel from '@/app/[locale]/(main)/_components/TripConfigurationPanel';
import Title from '@/components/Title';
import {QUERY_KEY} from '@/constants/queryKey';
import ServerPrefetchProvider from '@/provider/ServerPrefetchProvider';
import PopularRegionsList from '@/app/[locale]/(main)/_components/PopularRegionsList';
import DynamicTravelList from '@/app/[locale]/(main)/_components/DynamicTravelList';

export default function MainPage() {
  return (
    <div className={''}>
      <div className={'flex flex-col items-center justify-center'}>
        <TripConfigurationPanel />
        <ServerPrefetchProvider
          queries={[
            {queryKey: [QUERY_KEY.PLACE.REGION], queryFn: getRegionList},
            {queryKey: [QUERY_KEY.PLACE.PLACE], queryFn: getPlaceList},
            {queryKey: [QUERY_KEY.PLACE.COURSE], queryFn: getCourseList},
          ]}
        >
          <Title title={'현재 가장 사랑받는 여행지 BEST 10'}>
            <DynamicTravelList />
          </Title>
          <Title title={'요즘 많이 찾는 지역'}>
            <PopularRegionsList />
          </Title>
        </ServerPrefetchProvider>
      </div>
    </div>
  );
}
