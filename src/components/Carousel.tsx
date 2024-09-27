'use client';

// eslint-disable-next-line import/named
import {EmblaOptionsType} from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import {ReactNode} from 'react';

import NextButton from '@/asset/nextButton.svg';
import PrevButton from '@/asset/prevButton.svg';
import CarouselButton from '@/components/CarouselButton';
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
        <div className="flex gap-3">{children}</div>
      </div>

      <CarouselButton
        isNext={false}
        type="button"
        classNames={`${prevBtnDisabled ? 'opacity-30 cursor-not-allowed' : 'opacity-70'}`}
        onClick={onPrevButtonClick}
        disabled={prevBtnDisabled}
        aria-label="Previous slide"
      >
        <PrevButton />
      </CarouselButton>

      <CarouselButton
        isNext
        type="button"
        classNames={`${nextBtnDisabled ? 'opacity-30 cursor-not-allowed' : 'opacity-70'}`}
        onClick={onNextButtonClick}
        disabled={nextBtnDisabled}
        aria-label="Next slide"
      >
        <NextButton />
      </CarouselButton>
    </div>
  );
}
