import {DB} from '@/db/db';

export type RegionType = (typeof DB)['region'][0];

export type CityCodeType = (typeof DB)['cityCode'][0];
