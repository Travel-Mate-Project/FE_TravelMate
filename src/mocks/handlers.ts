import {http, HttpResponse} from 'msw';

import {DB} from '@/constants/db';
import {END_POINT} from '@/constants/endPoint';

export const handlers = [
  http.get(END_POINT.place.regions, () => {
    return HttpResponse.json(DB.place, {});
  }),
];
