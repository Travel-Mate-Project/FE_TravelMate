import {TitleProps} from '@/types';

export default function Title({title, children}: TitleProps) {
  return (
    <section className={'w-full mt-10'}>
      <h2 className={'text-xl font-semibold'}>{title}</h2>
      {children}
    </section>
  );
}
