import {CardProps} from '@/types';

export default function Card({region}: CardProps) {
  return <article className={'w-96'}>{region.name}</article>;
}
