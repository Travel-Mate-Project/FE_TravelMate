import Image from 'next/image';

import TripConfigurationForm from '@/app/[locale]/(main)/_components/TripConfigurationForm';
import logo from '@/asset/Logo.svg';

export default function TripConfigurationPanel() {
  return (
    <div className={'rounded-xl max-w-full h-auto '}>
      <div className={'flex flex-col items-center py-10'}>
        <Image src={logo} alt={'logo'} priority />
        <h2 className={'font-semibold text-xl mt-8'}>
          여행코스를 손쉽게 착착 🙌
        </h2>
        <TripConfigurationForm />
      </div>
    </div>
  );
}
