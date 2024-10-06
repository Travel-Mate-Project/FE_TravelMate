import Image from 'next/image';

import Message from '@/asset/message.svg';
import {CardProps} from '@/types';

import Star from '@/asset/Star.svg';
import {Link} from '@/i18n/routing';

export default function Card({
  region,
  width = 200,
  height = 200,
  variant,
}: CardProps) {
  return (
    <Link href={`/`}>
      <article
        className={`w-[200px] h-[300px] flex align-center flex-col gap-1.5`}
      >
        <div className={'relative'}>
          <Image
            src={region.imageURL}
            alt={'placeImage'}
            width={width}
            height={height}
          />
          {variant === 'course' && (
            <p
              className={
                'absolute bottom-0 text-white bg-black rounded-tr-md py-1 px-2 text-sm opacity-70'
              }
            >
              1박2일
            </p>
          )}
        </div>
        <div className={'flex flex-col justify-center'}>
          <p className={'font-semibold'}>{region.name}</p>
          {variant !== 'region' && (
            <span className={'text-gray300 text-sm'}>{region.addr}</span>
          )}
        </div>
        {variant !== 'region' && (
          <div className={'flex items-center text-gray300 text-sm gap-2'}>
            <div className={'flex items-center'}>
              <Star />
              <span className={'pl-1'}>{region.rating}</span>
            </div>
            <div className={'flex items-center'}>
              <Message />
              <span className={'pl-1'}>{region.commentCount}</span>
            </div>
          </div>
        )}
      </article>
    </Link>
  );
}
