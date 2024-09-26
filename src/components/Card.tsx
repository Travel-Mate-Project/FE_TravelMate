import Image from 'next/image';

import {CardProps} from '@/types';

export default function Card({places}: CardProps) {
  return (
    <article>
      <Image priority src={places.imageURL} alt={'image'} />
    </article>
  );
}
