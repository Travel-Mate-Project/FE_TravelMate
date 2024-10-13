import {http, HttpResponse} from 'msw';

import {END_POINT} from '@/constants/endPoint';
import {DB} from '@/db/db';

export const handlers = [
  http.get(END_POINT.place.regions, () => {
    return HttpResponse.json(DB.region, {});
  }),

  http.get(END_POINT.place.place, () => {
    return HttpResponse.json(DB.place, {});
  }),

  http.get(END_POINT.place.course, () => {
    return HttpResponse.json(DB.course, {});
  }),

  http.get(END_POINT.place.cafe, () => {
    return HttpResponse.json(DB.cafe, {});
  }),

  http.get(END_POINT.place.cityCode, () => {
    return HttpResponse.json(DB.cityCode, {});
  }),

  http.get(END_POINT.search.addPlace, ({request}) => {
    const url = new URL(request.url);
    const searchQuery = url.searchParams.get('searchQuery');
    const type = url.searchParams.get('type');

    if (!searchQuery) {
      return HttpResponse.json([]);
    }

    const filteredPlaces = DB.searchPlace.filter((place) => {
      const matchesQuery = place.name.includes(searchQuery);
      const matchesType = type === 'recommand' || place.type === type;
      return matchesQuery && matchesType;
    });

    return HttpResponse.json(filteredPlaces);
  }),
];
