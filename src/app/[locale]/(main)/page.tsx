import {getCourseList, getPlaceList, getRegionList} from '@/api';
import TripConfigurationPanel from '@/app/[locale]/(main)/_components/TripConfigurationPanel';
import Title from '@/components/Title';
import {QUERY_KEY} from '@/constants/queryKey';
import ServerPrefetchProvider from '@/provider/ServerPrefetchProvider';
import PopularRegionsList from '@/app/[locale]/(main)/_components/PopularRegionsList';
import DynamicTravelList from '@/app/[locale]/(main)/_components/DynamicTravelList';
import {useTranslations} from 'next-intl';

export default function MainPage() {
  const t = useTranslations('mainTravelList');
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
          <Title title={t('topTenPlace')}>
            <DynamicTravelList />
          </Title>
          <Title title={t('hotRegion')}>
            <PopularRegionsList />
          </Title>
        </ServerPrefetchProvider>
      </div>
    </div>
  );
}
