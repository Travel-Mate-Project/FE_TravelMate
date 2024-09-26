import {getRegions} from '@/api';
import TripConfigurationPanel from '@/app/[locale]/(main)/_components/TripConfigurationPanel';
import Title from '@/components/Title';
import {QUERY_KEY} from '@/constants/queryKey';
import ServerPrefetchProvider from '@/provider/ServerPrefetchProvider';

export default function MainPage() {
  return (
    <div className={''}>
      <div className={'flex flex-col items-center justify-center'}>
        <TripConfigurationPanel />
        <ServerPrefetchProvider
          queries={{queryKey: [QUERY_KEY.PLACE.REGION], queryFn: getRegions}}
        >
          <Title title={'현재 가장 사랑받는 여행지 BEST 10'}>
            <p>명소/코스</p>
            <div>placeList container 자리</div>
          </Title>
          <Title title={'요즘 많이 찾는 지역'}>
            <div>placeList container 자리</div>
          </Title>
        </ServerPrefetchProvider>
      </div>
    </div>
  );
}
