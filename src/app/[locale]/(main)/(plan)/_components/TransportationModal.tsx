import React, {useEffect, useRef} from 'react';

import Car from '@/asset/humbleicons_car.svg';
import Bus from '@/asset/mdi_bus.svg';
import BasicButton from '@/components/BasicButton';
import {TransportationModalProps} from '@/types';
import {useTripStore} from '@/store';
import {useRouter} from '@/i18n/routing';

export default function TransportationModal({
  isOpen,
  onClose,
}: TransportationModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  const transportation = useTripStore.use.transportation();
  const setTransportation = useTripStore.use.setTransportation();
  const route = useRouter();

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleSelectType = (type: string) => {
    setTransportation(type);
  };

  const handleNext = () => {
    if (!transportation || transportation === '') {
      alert('이동수단을 선택해주세요.');
      return;
    }
    route.push('/ready');
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
      <div
        ref={modalRef}
        className="relative bg-white w-[90%] max-w-md flex-col flex rounded-lg"
      >
        <div className="p-6">
          <div className={'flex flex-col items-center justify-center'}>
            <h2 className="text-xl font-bold mb-2">이동수단 선택</h2>
            <p className="text-gray-600 mb-6">
              여행 시 이용하실 이동수단을 선택해주세요!
            </p>
          </div>

          <div className="flex space-x-4 mb-6">
            <button
              className={`flex-1 py-4 border rounded-lg ${transportation === 'public' ? 'border-teal-500 bg-green100 text-white' : 'border-gray-300'}`}
              onClick={() => handleSelectType('public')}
            >
              <p className={'flex flex-col items-center'}>
                <Bus
                  className={`w-10 h-10 ${transportation === 'public' ? 'fill-white' : 'fill-black'}`}
                />
                대중교통
              </p>
            </button>
            <button
              className={`flex-1 py-3 border rounded-lg ${transportation === 'car' ? 'border-teal-500 bg-green100 text-white' : 'border-gray-300'}`}
              onClick={() => handleSelectType('car')}
            >
              <p className={'flex flex-col items-center'}>
                <Car
                  className={`w-10 h-10 ${transportation === 'car' ? 'fill-white' : 'fill-black'}`}
                />
                자가용
              </p>
            </button>
          </div>

          <div className="flex justify-between space-x-3">
            <BasicButton
              type={'button'}
              variant={'tertiary'}
              onClick={onClose}
              classNames="px-4 py-2 flex-1"
            >
              닫기
            </BasicButton>
            <BasicButton
              type={'button'}
              classNames="px-4 py-2 flex-1"
              disabled={!transportation}
              onClick={handleNext}
            >
              다음
            </BasicButton>
          </div>
        </div>
      </div>
    </div>
  );
}
