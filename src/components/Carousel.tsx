'use client';

// eslint-disable-next-line import/named
import {EmblaOptionsType} from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import {ReactNode} from 'react';

import {usePrevNextButtons} from '@/hooks/usePrevNextButtons';

type PropType = {
  children: ReactNode;
  options?: EmblaOptionsType;
};

export default function Carousel({
  children,
  options = {align: 'start'},
}: PropType) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">{children}</div>
      </div>

      <button
        className={`absolute left-0 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 p-2 rounded-r-lg transition-all ${prevBtnDisabled ? 'opacity-30 cursor-not-allowed' : 'opacity-70'}`}
        onClick={onPrevButtonClick}
        disabled={prevBtnDisabled}
        aria-label="Previous slide"
      >
        Prev
      </button>

      <button
        className={`absolute right-0 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 p-2 rounded-l-lg transition-all ${nextBtnDisabled ? 'opacity-30 cursor-not-allowed' : 'opacity-70'}`}
        onClick={onNextButtonClick}
        disabled={nextBtnDisabled}
        aria-label="Next slide"
      >
        Next
      </button>
    </div>
  );
}
