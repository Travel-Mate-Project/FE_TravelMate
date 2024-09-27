import Image from 'next/image';

import {CardProps} from '@/types';

export default function Card({region}: CardProps) {
  return (
    <article className={'w-[200px] h-[200px] flex align-center justify-center'}>
      <Image
        src={region.imageURL}
        alt={'placeImage'}
        width={200}
        height={200}
      />
    </article>
  );
}
